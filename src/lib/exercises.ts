// lib/exercises.ts
import { promises as fs } from 'fs';
import path from 'path';

export interface Exercise {
  topic: string;
  difficulty: number;
  points: number;
  title: string;
  content: string;
  ressource?: string;
  image?: string;
  origin?: string;
  name?: string;
  appendix?: string;
}

export async function loadExercises(baseDirAbs?: string): Promise<Exercise[]> {
  const dir = baseDirAbs
    ? path.join(baseDirAbs, 'exercises')
    : path.join(
        process.cwd(),
        'public',
        process.env.NODE_ENV === 'test' ? 'mockdata' : 'data',
        'exercises',
      );

  const files = await fs.readdir(dir);
  const exercises: Exercise[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const [topic, diffStr, pointsWithExt] = file.split('_');
    const pointsStr = pointsWithExt.replace(/\.md$/i, '');
    const difficulty = Number(diffStr);
    const points = Number(pointsStr);
    const raw = await fs.readFile(path.join(dir, file), 'utf8');

    const parts = raw.split(/^##\s+/gm).filter(Boolean);

    for (const part of parts) {
      const lines = part.split(/\r?\n/);
      const firstLine = lines.shift() || '';
      const meta: Record<string, string> = {};

      let title = firstLine;
      const metaMatch = firstLine.match(/\{([^}]+)\}/);
      if (metaMatch) {
        const metaString = metaMatch[1];
        metaString.split(',').forEach((entry) => {
          const [k, v] = entry.split(':');
          if (k && v) {
            meta[k.trim()] = v.trim().replace(/^"|"$/g, '');
          }
        });
        title = firstLine.replace(/\{[^}]+\}/, '').trim();
      }

      const content = lines.join('\n').trim();

      exercises.push({
        topic,
        difficulty,
        points,
        title: title || file,
        content,
        ressource: meta['ressource'],
        image: meta['image'],
        origin: meta['origin'],
        name: meta['name'],
        appendix: meta['appendix'],
      });
    }
  }

  return exercises;
}

export async function getTopicsAndDifficulties(
  baseDirAbs?: string,
): Promise<{ topics: string[]; difficulties: number[] }> {
  const exercises = await loadExercises(baseDirAbs);
  const topics = Array.from(new Set(exercises.map((e) => e.topic)));
  const difficulties = Array.from(new Set(exercises.map((e) => e.difficulty))).sort(
    (a, b) => a - b,
  );
  return { topics, difficulties };
}
