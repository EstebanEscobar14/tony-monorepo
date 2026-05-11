export type AdminMetric = {
  label: string;
  value: string;
  helper: string;
};

export type AdminSetting = {
  key: string;
  scope: string;
  owner: string;
  status: 'Active' | 'Draft';
  updatedAt: string;
};

export function buildAdminMetrics(): AdminMetric[] {
  return [
    { label: 'Usuarios activos', value: '128', helper: 'Sesiones habilitadas esta semana' },
    { label: 'Politicas vigentes', value: '24', helper: 'Baselines compartidas por dominio' },
    { label: 'Conectores remotos', value: '6', helper: 'Host conectado a los remotes federados' },
  ];
}

export function buildAdminSettings(): AdminSetting[] {
  return [
    {
      key: 'theme.default',
      scope: 'workspace',
      owner: 'Platform',
      status: 'Active',
      updatedAt: '2026-04-18T12:30:00.000Z',
    },
    {
      key: 'auth.sessionTimeout',
      scope: 'shell',
      owner: 'Security',
      status: 'Active',
      updatedAt: '2026-04-19T07:45:00.000Z',
    },
    {
      key: 'compliance.reportingWindow',
      scope: 'compliance',
      owner: 'Regulatory Ops',
      status: 'Draft',
      updatedAt: '2026-04-14T09:10:00.000Z',
    },
  ];
}
