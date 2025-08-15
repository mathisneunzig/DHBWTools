import type { Exercise } from '@/lib/exercises';
import { jsPDF } from 'jspdf';
import { promises as fs } from 'fs';

export function getLastResultLine(template: string, maxPoints: number): string {
  return template
    .replace('{nr}', 'Total')
    .replace('{type}', '---')
    .replace('{difficulty}', '---')
    .replace('{max}', maxPoints.toString());
}

export function getResult(
  exercises: Exercise[],
  template: string,
  maxPoints: number
): string {
  let result = '';
  exercises.forEach((e, index) => {
    const row = template
      .replace('{nr}', (index + 1).toString())
      .replace('{type}', e.name || e.topic)
      .replace('{difficulty}', e.difficulty + '')
      .replace('{max}', e.points.toString());
    result += row + '\n';
  });
  result += getLastResultLine(template, maxPoints) + '\n';
  return result;
}

export function htmlToPdf(html: string): Uint8Array {
    const doc = new jsPDF();
    const text = html.replace(/<[^>]+>/g, '');
    doc.text(text, 10, 10);
    return new Uint8Array(doc.output('arraybuffer'));
}

export async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}