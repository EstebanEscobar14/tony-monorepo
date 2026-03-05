import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./onboarding-page.component').then((m) => m.OnboardingPageComponent),
  },
];
