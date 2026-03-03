import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['mfePayments', 'mfeTreasury', 'mfeAuth', 'mfeCompliance', 'mfeOnboarding', 'mfeAdmin'],
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
