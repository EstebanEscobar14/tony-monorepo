export type PaymentRecord = {
  id: string;
  beneficiary: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Processing' | 'Scheduled';
  channel: 'SEPA' | 'SWIFT' | 'Instant';
};

export type TreasuryRow = {
  id: string;
  account: string;
  region: string;
  balance: number;
  available: number;
  change: number;
  risk: 'Low' | 'Medium' | 'High';
  owner: string;
};

export type AnalyticsMetric = {
  label: string;
  value: number;
  trend: string;
};

const BENEFICIARIES = [
  'Acme Manufacturing',
  'Northwind Logistics',
  'Atlas Energy',
  'Bluewave Systems',
  'Valencia Retail',
  'Nova Capital',
];

const REGIONS = ['Iberia', 'DACH', 'Nordics', 'UK', 'LATAM'];
const OWNERS = ['Treasury Ops', 'Cash Desk', 'Liquidity', 'Risk Control'];

export function buildPaymentsDataset(): PaymentRecord[] {
  return [
    {
      id: 'PAY-1042',
      beneficiary: BENEFICIARIES[0],
      amount: 185000,
      currency: 'EUR',
      status: 'Completed',
      channel: 'SEPA',
    },
    {
      id: 'PAY-1043',
      beneficiary: BENEFICIARIES[1],
      amount: 92000,
      currency: 'EUR',
      status: 'Processing',
      channel: 'Instant',
    },
    {
      id: 'PAY-1044',
      beneficiary: BENEFICIARIES[2],
      amount: 410000,
      currency: 'USD',
      status: 'Scheduled',
      channel: 'SWIFT',
    },
    {
      id: 'PAY-1045',
      beneficiary: BENEFICIARIES[3],
      amount: 128000,
      currency: 'GBP',
      status: 'Completed',
      channel: 'SWIFT',
    },
    {
      id: 'PAY-1046',
      beneficiary: BENEFICIARIES[4],
      amount: 67000,
      currency: 'EUR',
      status: 'Processing',
      channel: 'SEPA',
    },
    {
      id: 'PAY-1047',
      beneficiary: BENEFICIARIES[5],
      amount: 153000,
      currency: 'USD',
      status: 'Completed',
      channel: 'Instant',
    },
  ];
}

export function buildTreasuryRows(total = 500): TreasuryRow[] {
  return Array.from({ length: total }, (_, index) => {
    const region = REGIONS[index % REGIONS.length];
    const balance = 750000 + index * 3150;
    const available = balance * (0.74 + (index % 5) * 0.04);

    return {
      id: `ACC-${String(index + 1).padStart(4, '0')}`,
      account: `Main ${region} ${index + 1}`,
      region,
      balance,
      available: Math.round(available),
      change: Number((((index % 11) - 5) * 0.43).toFixed(2)),
      risk: index % 9 === 0 ? 'High' : index % 4 === 0 ? 'Medium' : 'Low',
      owner: OWNERS[index % OWNERS.length],
    };
  });
}

export function buildAnalyticsMetrics(): AnalyticsMetric[] {
  return [
    { label: 'Cash coverage', value: 98, trend: '+4.2%' },
    { label: 'Payment SLA', value: 96, trend: '+1.3%' },
    { label: 'Liquidity alerts', value: 7, trend: '-2.1%' },
  ];
}
