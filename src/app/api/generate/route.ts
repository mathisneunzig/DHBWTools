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

    const all = await loadExercises(dataDir);
    const pool = all.filter(
      (e) => topics.includes(e.topic) && difficulties.includes(e.difficulty)
    );

    const header = await fs.readFile(path.join(dataDir, 'header.md'), 'utf8');
    const footer = await fs.readFile(path.join(dataDir, 'footer.md'), 'utf8');
    const result = await fs.readFile(path.join(dataDir, 'result.md'), 'utf8');
    const resultrow = await fs.readFile(path.join(dataDir, 'resultrow.md'), 'utf8');
    const css = await fs.readFile(path.join(process.cwd(), 'src/styles/pdf-style.css'), 'utf8');

    const byTopic: Record<string, Exercise[]> = {};
    for (const t of topics) byTopic[t] = [];
    for (const ex of pool) byTopic[ex.topic]?.push(ex);
    for (const t of topics) byTopic[t] = shuffle(byTopic[t]);

    const order = shuffle([...topics]);
    const indices: Record<string, number> = Object.fromEntries(order.map(t => [t, 0]));
    const selected: Exercise[] = [];
    let sumPoints = 0;

    let active = order.filter(t => byTopic[t].length > 0).length;
    const maxLoops = 10000;
    let loops = 0;

    while (sumPoints < totalPoints && active > 0 && loops < maxLoops) {
      for (const t of order) {
        if (sumPoints >= totalPoints) break;
        const list = byTopic[t];
        let i = indices[t] ?? 0;
        if (!list || i >= list.length) continue;

        let picked: Exercise | null = null;
        while (i < list.length) {
          const cand = list[i];
          if (sumPoints + cand.points <= totalPoints && !selected.includes(cand)) {
            picked = cand;
            i += 1;
            break;
          }
          i += 1;
        }
        indices[t] = i;

        if (picked) {
          selected.push(picked);
          sumPoints += picked.points;
        }

        if (i >= list.length) {
          active = order.filter(x => indices[x] < byTopic[x].length).length;
        }
      }
      loops += 1;
      if (order.every(t => indices[t] >= (byTopic[t]?.length ?? 0))) break;
    }

    const shuffledSelected = shuffle([...selected]);
    const exerciseMarkdowns = await getExercises(shuffledSelected, dataDir);
    const { marked } = await import('marked');
    const exerciseHtmlBlocks = exerciseMarkdowns
      .map((md) => `<div class="exercise">${marked(md)}</div>`)
      .join('\n');

    const headerMD = header.replace('{points}', '' + maxPoints) + '\n\n';
    const footerMD = result + '\n' + getResult(shuffledSelected, resultrow, maxPoints) + '\n\n' + footer + '\n\n';
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

    return NextResponse.json({ 
      title, 
      css, 
      body, 
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error in /api/generate:', err);
    return NextResponse.json({ error: (err as Error).message ?? 'Unknown error' }, { status: 500 });
  }
}
