import { Routes } from '@angular/router';
import { RemoteFallbackComponent } from './remote-fallback.component';

export type RemoteRoutesModule = {
  remoteRoutes: Routes;
};

export type RemoteContract = {
  name: string;
  exposedRoutes: './Routes' | './analytics-element.js';
  compatibility: string;
};

export const angularRemoteContracts = {
  auth: {
    name: 'mfeAuth',
    exposedRoutes: './Routes',
    compatibility: 'Exports Angular Routes for /auth and shares @tony-ui/core as a singleton.',
  },
  payments: {
    name: 'mfePayments',
    exposedRoutes: './Routes',
    compatibility: 'Exports Angular Routes for /payments and consumes shared UI/utils only.',
  },
  treasury: {
    name: 'mfeTreasury',
    exposedRoutes: './Routes',
    compatibility: 'Exports Angular Routes for /treasury and consumes shared UI/utils only.',
  },
  compliance: {
    name: 'mfeCompliance',
    exposedRoutes: './Routes',
    compatibility: 'Exports Angular Routes for /compliance and expects an authenticated shell route.',
  },
  onboarding: {
    name: 'mfeOnboarding',
    exposedRoutes: './Routes',
    compatibility: 'Exports Angular Routes for /onboarding and expects an authenticated shell route.',
  },
  admin: {
    name: 'mfeAdmin',
    exposedRoutes: './Routes',
    compatibility: 'Exports Angular Routes for /admin and expects an admin-only shell route.',
  },
} as const satisfies Record<string, RemoteContract>;

export async function loadRemoteRoutes(
  contract: RemoteContract,
  loader: () => Promise<RemoteRoutesModule>
): Promise<Routes> {
  try {
    const remote = await loader();

    if (!Array.isArray(remote.remoteRoutes)) {
      throw new Error(`${contract.name} did not expose a remoteRoutes array`);
    }

    return remote.remoteRoutes;
  } catch (error) {
    console.error(`[mfe-contract] ${contract.name} failed to load`, error);

    return [
      {
        path: '',
        pathMatch: 'full',
        component: RemoteFallbackComponent,
        data: {
          remoteName: contract.name,
        },
      },
    ];
  }
}
