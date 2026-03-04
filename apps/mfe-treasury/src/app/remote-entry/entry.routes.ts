import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./treasury-page.component').then((m) => m.TreasuryPageComponent),
  },
];
