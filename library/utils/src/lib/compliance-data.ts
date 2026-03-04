export type ComplianceCaseStatus = 'Open' | 'Review' | 'Escalated' | 'Closed';

export type ComplianceCase = {
  id: string;
  title: string;
  jurisdiction: 'ES' | 'UK' | 'DE' | 'US';
  owner: string;
  status: ComplianceCaseStatus;
  priority: 'Low' | 'Medium' | 'High';
  updatedAt: string;
  summary: string;
};

const COMPLIANCE_CASES: ComplianceCase[] = [
  {
    id: 'CMP-301',
    title: 'Revision de alertas AML trimestrales',
    jurisdiction: 'ES',
    owner: 'Maria Torres',
    status: 'Review',
    priority: 'High',
    updatedAt: '2026-04-18T09:30:00.000Z',
    summary: 'Pendiente consolidar anexos y validar evidencias de screening.',
  },
  {
    id: 'CMP-302',
    title: 'Seguimiento de KYC reforzado',
    jurisdiction: 'UK',
    owner: 'Iker Salas',
    status: 'Open',
    priority: 'Medium',
    updatedAt: '2026-04-17T13:20:00.000Z',
    summary: 'Se requiere documentacion adicional para dos clientes corporativos.',
  },
  {
    id: 'CMP-303',
    title: 'Reporte regulatorio PSD2',
    jurisdiction: 'DE',
    owner: 'Laura Vives',
    status: 'Escalated',
    priority: 'High',
    updatedAt: '2026-04-16T16:45:00.000Z',
    summary: 'El regulador ha pedido trazabilidad completa de accesos y consentimiento.',
  },
  {
    id: 'CMP-304',
    title: 'Control de sanciones internacionales',
    jurisdiction: 'US',
    owner: 'Pablo Navas',
    status: 'Closed',
    priority: 'Low',
    updatedAt: '2026-04-12T10:00:00.000Z',
    summary: 'Caso archivado tras reconciliar listas OFAC y evidencias internas.',
  },
];

export function buildComplianceCases(): ComplianceCase[] {
  return COMPLIANCE_CASES.map((item) => ({ ...item }));
}
