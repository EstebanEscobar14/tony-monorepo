import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation({
  ...config,
  remotes: [
    ['mfePayments', 'http://localhost:4201'],
    ['mfeTreasury', 'http://localhost:4202'],
    ['mfeAuth', 'http://localhost:4204'],
    ['mfeCompliance', 'http://localhost:4205'],
    ['mfeOnboarding', 'http://localhost:4206'],
    ['mfeAdmin', 'http://localhost:4207'],
  ],
}, { dts: false });
