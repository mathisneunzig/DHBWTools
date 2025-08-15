export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { loadExercises, Exercise } from '@/lib/exercises';
import { getResult, fileExists } from './utils';
import { getTenantOrThrow, getTenantDataDirAbs } from '@/lib/tenant';

function shuffle<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

let appendix: string[] = [];
let maxPoints = 0;

function addAppendix(str: string) {
  if (!appendix.includes(str)) appendix.push(str);
}

async function getAppendix(dataDir: string) {
  const folderName = path.basename(dataDir);
  if (appendix.length === 0) return '';
  let string = `# ${folderName == 'db' ? "Appendix" : "Anhang"} \n\n `;
  for (let i = 0; i < appendix.length; i++) {
    const e = appendix[i];
    const filepath = path.join(dataDir, 'appendix', `${e}.md`);
    if (await fileExists(filepath)) {
      const a = await fs.readFile(filepath, 'utf8');
      string += `## ${e} \n\n ${a} \n\n`;
      // if (i < appendix.length - 1) {
      //   string += '<div style="page-break-after: always;"></div> \n\n';
      // }
    } else {
      console.error('❌ File does not exist:', filepath);
    }
  }
  return string;
}

async function getExercises(exercises: Exercise[], dataDir: string): Promise<string[]> {
  const folderName = path.basename(dataDir);
  const blocks: string[] = [];
  for (const [index, e] of exercises.entries()) {
    let exercise = `## ${index + 1}.) ${e.title} (${e.points} ${folderName == 'db' ? "points" : "Punkte"})`;
    maxPoints += e.points;

    if (e.appendix) {
      const name = e.appendix.split(".")[0];
      exercise += `\n\n <small>${folderName == 'db' ? "For this exercise, please have a look at appendix" : "Zu dieser Aufgabe gehört Anhang"} "${name}"</small> `;
      addAppendix(name);
    }

    exercise += ` \n\n `;

    if (e.ressource) {
      const resPath = path.join(dataDir, 'ressources', e.ressource);
      if (await fileExists(resPath)) {
        const resContent = await fs.readFile(resPath, 'utf8');
        exercise += '<div class="res"> \n\n ' + resContent + ' </div> \n\n';
      }
    }

    if (e.image) {
      const imgPath = path.join(dataDir, 'images', e.image);
      if (await fileExists(imgPath)) {
        const imgBase64 = await fs.readFile(imgPath, { encoding: 'base64' });
        exercise += `![Image](data:image/png;base64,${imgBase64}) \n\n`;
      }
    }

    exercise += e.content + '\n\n---\n';
    blocks.push(exercise);
  }
  return blocks;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  maxPoints = 0;
  appendix = [];

  try {
    const tenant = await getTenantOrThrow();
    const dataDir = await getTenantDataDirAbs();

    const data = await req.json();
    const { topics, difficulties, points: totalPoints } = data;

    // tenant-spezifisch laden
    const all = await loadExercises(dataDir);
    const exercises = all.filter(
      (e) => topics.includes(e.topic) && difficulties.includes(e.difficulty)
    );

    const header = await fs.readFile(path.join(dataDir, 'header.md'), 'utf8');
    const footer = await fs.readFile(path.join(dataDir, 'footer.md'), 'utf8');
    const result = await fs.readFile(path.join(dataDir, 'result.md'), 'utf8');
    const resultrow = await fs.readFile(path.join(dataDir, 'resultrow.md'), 'utf8');
    const css = await fs.readFile(path.join(process.cwd(), 'src/styles/pdf-style.css'), 'utf8');

    const byDifficulty: Record<number, Exercise[]> = {};
    difficulties.forEach((d: number) => (byDifficulty[d] = []));
    for (const ex of exercises) {
      if (byDifficulty[ex.difficulty]) byDifficulty[ex.difficulty].push(ex);
    }

    const selected: Exercise[] = [];
    for (const diff of difficulties) {
      const list = shuffle(byDifficulty[diff]);
      if (list.length) selected.push(list[0]);
    }

    let sumPoints = selected.reduce((sum, ex) => sum + ex.points, 0);
    const rest: Exercise[] = shuffle(exercises.filter((ex) => !selected.includes(ex)));
    for (const ex of rest) {
      if (sumPoints + ex.points > totalPoints) continue;
      selected.push(ex);
      sumPoints += ex.points;
      if (sumPoints >= totalPoints) break;
    }

    const exerciseMarkdowns = await getExercises(selected, dataDir);
    const { marked } = await import('marked');
    const exerciseHtmlBlocks = exerciseMarkdowns
      .map((md) => `<div class="exercise">${marked(md)}</div>`)
      .join('\n');

    const headerMD = header.replace('{points}', '' + maxPoints) + '\n\n';
    const footerMD = result + '\n' + getResult(selected, resultrow, maxPoints) + '\n\n' + footer + '\n\n';
    const appendixMD = await getAppendix(dataDir);

    const title = `${tenant.title} – Mock Exam`;

    const body = `
      <div class="exercise">${marked(headerMD)}</div>
      ${exerciseHtmlBlocks}
      <div style="page-break-after: always;"></div>
      <div class="exercise">${marked(footerMD)}</div>
      <div style="page-break-after: always;"></div>
      ${marked(appendixMD)}
    `;

    const markdown = headerMD + exerciseMarkdowns.join('\n') + '\n' + footerMD + '\n' + appendixMD;

    return NextResponse.json({ title, css, body, markdown, maxPoints, selected }, { status: 200 });
  } catch (err) {
    console.error('❌ Error in /api/generate:', err);
    return NextResponse.json({ error: (err as Error).message ?? 'Unknown error' }, { status: 500 });
  }
}
