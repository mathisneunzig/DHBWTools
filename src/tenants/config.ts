export type TenantId = 'db' | 'se2' | 'fs';

export type TenantCfg = {
  id: TenantId;
  domains: string[];   
  title: string;       
  dataDir: string;     
};

export const TENANTS: TenantCfg[] = [
  {
    id: 'db',
    domains: ['db.mathisneunzig.de', 'db.localhost:3000', 'db.localhost'],
    title: 'Database Systems',
    dataDir: 'public/data/db',
  },
  {
    id: 'se2',
    domains: ['se2.mathisneunzig.de', 'se2.localhost:3000', 'se2.localhost'],
    title: 'Software Engineering II',
    dataDir: 'public/data/se',
  },
  {
    id: 'fs',
    domains: ['fs.mathisneunzig.de', 'fs.localhost:3000', 'fs.localhost'],
    title: 'Fortgeschrittene Systementwicklung',
    dataDir: 'public/data/stats',
  },
];

export function getTenantByHost(host?: string): TenantCfg | null {
  if (!host) return null;
  const h = host.toLowerCase();
  return TENANTS.find(t => t.domains.some(d => d.toLowerCase() === h)) ?? null;
}
