export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getTopicsAndDifficulties } from '@/lib/exercises';
import { getTenantDataDirAbs } from '@/lib/tenant';

export async function GET(): Promise<NextResponse> {
  const dataDir = await getTenantDataDirAbs();
  const data = await getTopicsAndDifficulties(dataDir);
  return NextResponse.json(data);
}