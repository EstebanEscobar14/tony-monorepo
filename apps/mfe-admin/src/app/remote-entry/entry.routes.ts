import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./admin-page.component').then((m) => m.AdminPageComponent),
  },
];
