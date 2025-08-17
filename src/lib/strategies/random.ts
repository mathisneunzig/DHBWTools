import { Exercise } from '../exercises';
import { shuffle } from '../utils';
import { ExerciseSelectionStrategy } from './types';

export class RandomStrategy implements ExerciseSelectionStrategy {
  select(exercises: Exercise[], totalPoints: number): Exercise[] {
    const shuffled = shuffle(exercises);
    const selected: Exercise[] = [];
    let sum = 0;

    for (const ex of shuffled) {
      if (sum + ex.points > totalPoints) continue;
      selected.push(ex);
      sum += ex.points;
      if (sum >= totalPoints) break;
    }

    return selected;
  }
}