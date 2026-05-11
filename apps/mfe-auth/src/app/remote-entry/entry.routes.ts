import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./auth-page.component').then((m) => m.AuthPageComponent),
  },
];
