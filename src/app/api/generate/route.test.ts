// @ts-nocheck
jest.mock('marked', () => ({
  marked: jest.fn(() => '<p>Mocked HTML</p>')
}));

import { NextRequest } from 'next/server';
import { POST } from './route';
import { htmlToPdf } from './utils';

describe('POST /api/generate integration', () => {
  it('generates exam with resources and appendix', async () => {
    const req = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify({
        topics: ['Topic1', 'Topic2'],
        difficulties: [1, 2],
        points: 8,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.maxPoints).toBe(8);
    expect(json.selected).toHaveLength(2);
    expect(json.body).toContain('<p>Mocked HTML</p>');
    expect(json.markdown).toContain('Header 8');
    expect(json.markdown).toContain('Resource for exercise 1.');
    expect(json.markdown).toContain('Appendix for exercise 1.');
    expect(json.markdown).toContain('For this exercise, please have a look at appendix');
    expect(json.markdown).toContain('| Total | --- | --- | 8 | |');
    const pdf = htmlToPdf(json.body);
    expect(pdf.byteLength).toBeGreaterThan(0);
  });

  it('omits appendix when none is referenced', async () => {
    const req = new NextRequest('http://localhost', {
      method: 'POST',
      body: JSON.stringify({
        topics: ['Topic2'],
        difficulties: [2],
        points: 3,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res = await POST(req);
    const json = await res.json();
    expect(json.maxPoints).toBe(3);
    expect(json.selected).toHaveLength(1);
    expect(json.body).not.toContain('Appendix');
  });
});