import { ExerciseSelectionStrategy } from './types';
import { RandomStrategy } from './random';
import { DifficultyStrategy } from './difficulty';
import { PointBalanceStrategy } from './pointBalance';
import { TopicStrategy } from './topic';

export { RandomStrategy, DifficultyStrategy, PointBalanceStrategy, TopicStrategy };

export function getStrategy(name?: string): ExerciseSelectionStrategy {
  switch (name) {
    case 'topic':
      return new TopicStrategy();
    case 'points':
      return new PointBalanceStrategy();
    case 'difficulty':
      return new DifficultyStrategy();
    case 'random':
    default:
      return new RandomStrategy();
  }
}