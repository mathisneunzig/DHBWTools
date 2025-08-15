// @ts-nocheck
import { loadExercises, getTopicsAndDifficulties } from './exercises';

describe('loadExercises', () => {
  it('reads from mockdata in test environment', async () => {
    const exercises = await loadExercises();
    const titles = exercises.map((e) => e.title);
    expect(titles).toContain('Mock Exercise 1');
  });

  it('reads from data when NODE_ENV is not test', async () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    jest.resetModules();
    const { loadExercises: load } = await import('./exercises');
    const exercises = await load();
    expect(exercises.length).toBeGreaterThan(0);
    process.env.NODE_ENV = originalEnv;
  });
});

describe('getTopicsAndDifficulties', () => {
  it('returns unique topics and sorted difficulties', async () => {
    const { topics, difficulties } = await getTopicsAndDifficulties();
    expect(topics.sort()).toEqual(['Topic1', 'Topic2']);
    expect(difficulties).toEqual([1, 2]);
  });
});