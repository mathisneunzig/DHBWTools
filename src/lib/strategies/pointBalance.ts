import { Exercise } from '../exercises';
import { shuffle } from '../utils';
import { ExerciseSelectionStrategy } from './types';

function splitByPoints(exercises: Exercise[]) {
  return {
    low: shuffle(exercises.filter((e) => e.points < 5)),
    high: shuffle(exercises.filter((e) => e.points >= 5)),
  };
}

export class PointBalanceStrategy implements ExerciseSelectionStrategy {
  select(exercises: Exercise[], totalPoints: number): Exercise[] {
    const { low, high } = splitByPoints(exercises);
    const selected: Exercise[] = [];
    let sum = 0;
    let pickLow = true;

    while (sum < totalPoints && (low.length || high.length)) {
      let pool: Exercise[];
      if (pickLow && low.length) {
        pool = low;
      } else if (!pickLow && high.length) {
        pool = high;
      } else if (low.length) {
        pool = low;
      } else {
        pool = high;
      }

      const ex = pool.pop()!;
      if (sum + ex.points > totalPoints) continue;
      selected.push(ex);
      sum += ex.points;
      pickLow = !pickLow;
    }

    return selected;
  }
}