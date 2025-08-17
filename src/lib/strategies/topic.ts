import { Exercise } from '../exercises';
import { shuffle } from '../utils';
import { ExerciseSelectionStrategy } from './types';

function groupByTopic(exercises: Exercise[], topics: string[]) {
  const map: Record<string, Exercise[]> = {};
  topics.forEach((t) => (map[t] = []));
  for (const ex of exercises) {
    if (map[ex.topic]) map[ex.topic].push(ex);
  }
  Object.values(map).forEach((list) => shuffle(list));
  return map;
}

export class TopicStrategy implements ExerciseSelectionStrategy {
  select(
    exercises: Exercise[],
    totalPoints: number,
    topics: string[]
  ): Exercise[] {
    const byTopic = groupByTopic(exercises, topics);
    const topicList = topics.filter((t) => byTopic[t]?.length);
    const selected: Exercise[] = [];
    let sum = 0;
    let idx = 0;

    while (sum < totalPoints && topicList.length) {
      const topic = topicList[idx % topicList.length];
      const list = byTopic[topic];
      if (!list.length) {
        topicList.splice(idx % topicList.length, 1);
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