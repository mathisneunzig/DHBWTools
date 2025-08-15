// @ts-nocheck
import { GET } from './route';

describe('GET /api/topics integration', () => {
  it('returns topics and difficulties from mockdata', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.topics.sort()).toEqual(['Topic1', 'Topic2']);
    expect(json.difficulties).toEqual([1, 2]);
  });
});