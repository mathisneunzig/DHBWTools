// @ts-nocheck
import { getResult, getLastResultLine, htmlToPdf } from './utils';
import type { Exercise } from '@/lib/exercises';

describe('result helpers', () => {
  it('formats the summary row', () => {
    const line = getLastResultLine('{nr}|{max}', 10);
    expect(line).toBe('Total|10');
  });

  it('creates a result table', () => {
    const template = '{nr}|{type}|{difficulty}|{max}';
    const exercises: Exercise[] = [
      { topic: 'SQL', difficulty: 1, points: 5, title: 'a', content: '', name: 'X' },
      { topic: 'DB', difficulty: 2, points: 3, title: 'b', content: '' },
    ];
    const output = getResult(exercises, template, 8);
    const lines = output.trim().split('\n');
    expect(lines).toEqual(['1|X|1|5', '2|DB|2|3', 'Total|---|---|8']);
  });

  it('creates a pdf from html', () => {
    const pdf = htmlToPdf('<p>Hello</p>');
    expect(pdf.byteLength).toBeGreaterThan(0);
  });
});