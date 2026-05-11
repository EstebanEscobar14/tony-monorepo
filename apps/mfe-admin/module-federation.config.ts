import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfeAdmin',
  exposes: {
    './Routes': 'apps/mfe-admin/src/app/remote-entry/entry.routes.ts',
  },
  additionalShared: [
    [
      '@tony-ui/core',
      {
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      },
    ],
  ],
};

/**
* Nx requires a default export of the config to allow correct resolution of the module federation graph.
**/
export default config;
