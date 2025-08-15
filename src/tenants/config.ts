export type TenantId = 'db' | 'se2' | 'se2-ka' | 'fs';

export type TenantCfg = {
  id: TenantId;
  domains: string[];   
  title: string;       
  dataDir: string;     
};

export const TENANTS: TenantCfg[] = [
  {
    id: 'db',
    domains: ['db.mathis-neunzig.de', 'db.localhost:3000', 'db.localhost'],
    title: 'Database Systems',
    dataDir: 'public/data/db',
  },
  {
    id: 'se2',
    domains: ['se2.mathis-neunzig.de', 'se2.localhost:3000', 'se2.localhost'],
    title: 'Software Engineering II',
    dataDir: 'public/data/se2',
  },
  {
    id: 'se2-ka',
    domains: ['se2-ka.mathis-neunzig.de', 'se2-ka.localhost:3000', 'se2-ka.localhost'],
    title: 'Software Engineering II',
    dataDir: 'public/data/se2-ka',
  },
  {
    id: 'fs',
    domains: ['fs.mathis-neunzig.de', 'fs.localhost:3000', 'fs.localhost'],
    title: 'Fortgeschrittene Systementwicklung',
    dataDir: 'public/data/fs',
  },
];

export function getTenantByHost(host?: string): TenantCfg | null {
  if (!host) return null;
  const h = host.toLowerCase();
  return TENANTS.find(t => t.domains.some(d => d.toLowerCase() === h)) ?? null;
}
