import { Exercise } from '../exercises';

export interface ExerciseSelectionStrategy {
  select(
    exercises: Exercise[],
    totalPoints: number,
    topics: string[],
    difficulties: number[]
  ): Exercise[];
}