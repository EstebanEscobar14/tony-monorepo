import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./payments-page.component').then((m) => m.PaymentsPageComponent),
  },
];
