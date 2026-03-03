import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

function resolveRemoteUrl(envKey: string, fallbackUrl: string): string {
  const value = process.env[envKey]?.trim();
  return value && value.length > 0 ? value.replace(/\/$/, '') : fallbackUrl;
}

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation({
  ...config,
  remotes: [
    ['mfePayments', resolveRemoteUrl('MFE_PAYMENTS_URL', 'http://localhost:4201')],
    ['mfeTreasury', resolveRemoteUrl('MFE_TREASURY_URL', 'http://localhost:4202')],
    ['mfeAuth', resolveRemoteUrl('MFE_AUTH_URL', 'http://localhost:4204')],
    ['mfeCompliance', resolveRemoteUrl('MFE_COMPLIANCE_URL', 'http://localhost:4205')],
    ['mfeOnboarding', resolveRemoteUrl('MFE_ONBOARDING_URL', 'http://localhost:4206')],
    ['mfeAdmin', resolveRemoteUrl('MFE_ADMIN_URL', 'http://localhost:4207')],
  ],
}, { dts: false });
