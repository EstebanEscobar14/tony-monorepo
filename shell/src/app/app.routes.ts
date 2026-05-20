import { Route } from '@angular/router';
import { requireSession } from './auth.guard';
import { angularRemoteContracts, loadRemoteRoutes } from './mfe-contracts';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () => loadRemoteRoutes(angularRemoteContracts.auth, () => import('mfeAuth/Routes')),
  },
  {
    path: 'payments',
    loadChildren: () =>
      loadRemoteRoutes(angularRemoteContracts.payments, () => import('mfePayments/Routes')),
  },
  {
    path: 'treasury',
    loadChildren: () =>
      loadRemoteRoutes(angularRemoteContracts.treasury, () => import('mfeTreasury/Routes')),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./analytics-host.component').then((m) => m.AnalyticsHostComponent),
  },
  {
    path: 'compliance',
    canMatch: [requireSession(['compliance', 'admin'])],
    loadChildren: () =>
      loadRemoteRoutes(angularRemoteContracts.compliance, () => import('mfeCompliance/Routes')),
  },
  {
    path: 'onboarding',
    canMatch: [requireSession(['operator', 'admin'])],
    loadChildren: () =>
      loadRemoteRoutes(angularRemoteContracts.onboarding, () => import('mfeOnboarding/Routes')),
  },
  {
    path: 'admin',
    canMatch: [requireSession(['admin'])],
    loadChildren: () => loadRemoteRoutes(angularRemoteContracts.admin, () => import('mfeAdmin/Routes')),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found.component').then((m) => m.NotFoundComponent),
  },
];
