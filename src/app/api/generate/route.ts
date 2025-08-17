export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { loadExercises, Exercise } from '@/lib/exercises';
import { getResult, fileExists } from './utils';
import { getTenantOrThrow, getTenantDataDirAbs } from '@/lib/tenant';
import { getStrategy } from '@/lib/strategies';
import { shuffle } from '@/lib/utils';

let appendix: string[] = [];
let maxPoints = 0;

function addAppendix(str: string) {
  if (!appendix.includes(str)) appendix.push(str);
}

async function getAppendix(dataDir: string) {
  const folderName = path.basename(dataDir);
  if (appendix.length === 0) return '';
  let string = `<div style="page-break-after: always;"></div> \n\n # ${folderName == 'db' ? "Appendix" : "Anhang"} \n\n `;
  for (let i = 0; i < appendix.length; i++) {
    const e = appendix[i];
    const filepath = path.join(dataDir, 'appendix', `${e}.md`);
    if (await fileExists(filepath)) {
      const a = await fs.readFile(filepath, 'utf8');
      string += `${a} \n\n`;
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
    const { topics, difficulties, points: totalPoints, strategy } = data;

    const all = await loadExercises(dataDir)
    const exercises = all.filter(
      (e) => topics.includes(e.topic) && difficulties.includes(e.difficulty)
    )

    const header = await fs.readFile(path.join(dataDir, 'header.md'), 'utf8');
    const footer = await fs.readFile(path.join(dataDir, 'footer.md'), 'utf8');
    const result = await fs.readFile(path.join(dataDir, 'result.md'), 'utf8');
    const resultrow = await fs.readFile(path.join(dataDir, 'resultrow.md'), 'utf8');
    const css = await fs.readFile(path.join(process.cwd(), 'src/styles/pdf-style.css'), 'utf8');

    const strategyImpl = getStrategy(strategy);
    const selected: Exercise[] = shuffle(strategyImpl.select(
      exercises,
      totalPoints,
      topics,
      difficulties
    ));
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
      ${marked(appendixMD)}
    `;

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
