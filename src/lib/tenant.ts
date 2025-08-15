import path from 'path';
import { headers } from 'next/headers';
import { getTenantByHost, type TenantCfg } from '@/tenants/config';

export async function resolveTenantFromHeaders(): Promise<TenantCfg | null> {
  const h = await headers();
  const xfHost = h.get('x-forwarded-host') || undefined;
  const host   = h.get('host') || undefined;
  return getTenantByHost(xfHost ?? host);
}

export async function getTenantOrThrow(): Promise<TenantCfg> {
  const tenant = await resolveTenantFromHeaders();
  if (!tenant) {
    throw new Error('Kein Tenant erkannt. Prüfe die Subdomain-Konfiguration.');
  }
  return tenant;
}

export async function getTenantDataDirAbs(): Promise<string> {
  const tenant = await getTenantOrThrow();
  return path.join(process.cwd(), tenant.dataDir);
}