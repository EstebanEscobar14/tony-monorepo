import { Route } from '@angular/router';
import { requireSession } from './auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('mfeAuth/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'payments',
    loadChildren: () => import('mfePayments/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'treasury',
    loadChildren: () => import('mfeTreasury/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./analytics-host.component').then((m) => m.AnalyticsHostComponent),
  },
  {
    path: 'compliance',
    canMatch: [requireSession(['compliance', 'admin'])],
    loadChildren: () => import('mfeCompliance/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'onboarding',
    canMatch: [requireSession(['operator', 'admin'])],
    loadChildren: () => import('mfeOnboarding/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'admin',
    canMatch: [requireSession(['admin'])],
    loadChildren: () => import('mfeAdmin/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found.component').then((m) => m.NotFoundComponent),
  },
];
