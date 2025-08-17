export type TenantId = 'db' | 'se2' | 'se2-ka' | 'fs';

export type TenantCfg = {
  id: TenantId;
  domains: string[];
  title: string;
  dataDir: string;
  color: string;
  secColor: string;
};

export const TENANTS: Record<TenantId, TenantCfg> = {
  db: {
    id: 'db',
    domains: ['db.mathis-neunzig.de', 'db.localhost:3000', 'db.localhost'],
    title: 'Database Systems',
    dataDir: 'public/data/db',
    color: 'darkgreen',
    secColor: 'green'
  },
  se2: {
    id: 'se2',
    domains: ['se2.mathis-neunzig.de', 'se2.localhost:3000', 'se2.localhost'],
    title: 'Software Engineering II',
    dataDir: 'public/data/se2',
    color: 'darkblue',
    secColor: 'blue'
  },
  'se2-ka': {
    id: 'se2-ka',
    domains: ['se2-ka.mathis-neunzig.de', 'se2-ka.localhost:3000', 'se2-ka.localhost'],
    title: 'Software Engineering II',
    dataDir: 'public/data/se2-ka',
    color: 'darkgreen',
    secColor: 'green'
  },
  fs: {
    id: 'fs',
    domains: ['fs.mathis-neunzig.de', 'fs.localhost:3000', 'fs.localhost'],
    title: 'Fortgeschrittene Systementwicklung',
    dataDir: 'public/data/fs',
    color: 'darkgreen',
    secColor: 'green'
  },
};

export function getTenantByHost(host?: string): TenantCfg | null {
  if (!host) return null;
  const h = host.toLowerCase().split(':')[0];
  const left = h.split('.')[0] || '';
  const candidates: TenantId[] = ['db', 'se2', 'se2-ka', 'fs'];
  for (const id of candidates) {
    if (left === id || left.startsWith(id + '-')) return TENANTS[id];
  }
  const exact = Object.values(TENANTS).find(t => t.domains.includes(h));
  if (exact) return exact;
  return TENANTS.db;
}
