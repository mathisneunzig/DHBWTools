import { Exercise } from '../exercises';
import { shuffle } from '../utils';
import { ExerciseSelectionStrategy } from './types';

function groupByDifficulty(exercises: Exercise[], difficulties: number[]) {
  const map: Record<number, Exercise[]> = {};
  difficulties.forEach((d) => (map[d] = []));
  for (const ex of exercises) {
    if (map[ex.difficulty]) map[ex.difficulty].push(ex);
  }
  Object.values(map).forEach((list) => shuffle(list));
  return map;
}

export class DifficultyStrategy implements ExerciseSelectionStrategy {
  select(
    exercises: Exercise[],
    totalPoints: number,
    _topics: string[],
    difficulties: number[]
  ): Exercise[] {
    const byDifficulty = groupByDifficulty(exercises, difficulties);
    const diffList = difficulties.filter((d) => byDifficulty[d]?.length);
    const selected: Exercise[] = [];
    let sum = 0;
    let idx = 0;

    while (sum < totalPoints && diffList.length) {
      const diff = diffList[idx % diffList.length];
      const list = byDifficulty[diff];
      if (!list.length) {
        diffList.splice(idx % diffList.length, 1);
        continue;
      }
      const ex = list.pop()!;
      if (sum + ex.points > totalPoints) continue;
      selected.push(ex);
      sum += ex.points;
      idx++;
    }

    return selected;
  }
}