import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./compliance-page.component').then((m) => m.CompliancePageComponent),
  },
];
