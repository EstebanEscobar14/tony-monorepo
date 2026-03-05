export type OnboardingStatus = 'Draft' | 'Pending Review' | 'Approved';

export type OnboardingRequest = {
  id: string;
  company: string;
  contact: string;
  region: string;
  status: OnboardingStatus;
  submittedAt: string;
  step: 'Intake' | 'Validation' | 'Activation';
};

const ONBOARDING_REQUESTS: OnboardingRequest[] = [
  {
    id: 'ONB-201',
    company: 'Orion Foods',
    contact: 'Claudia Vega',
    region: 'Iberia',
    status: 'Pending Review',
    submittedAt: '2026-04-15T08:15:00.000Z',
    step: 'Validation',
  },
  {
    id: 'ONB-202',
    company: 'Atlas Marine',
    contact: 'Hector Ruiz',
    region: 'UK',
    status: 'Approved',
    submittedAt: '2026-04-13T11:05:00.000Z',
    step: 'Activation',
  },
  {
    id: 'ONB-203',
    company: 'Vertex Health',
    contact: 'Nora Molina',
    region: 'DACH',
    status: 'Draft',
    submittedAt: '2026-04-11T15:40:00.000Z',
    step: 'Intake',
  },
];

export function buildOnboardingRequests(): OnboardingRequest[] {
  return ONBOARDING_REQUESTS.map((item) => ({ ...item }));
}
