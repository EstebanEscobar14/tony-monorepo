import { describe, expect, it } from 'vitest';
import { remoteRoutes } from './entry.routes';

describe('mfeTreasury remote routes', () => {
  it('exposes a default route for the remote entry', () => {
    expect(remoteRoutes).toHaveLength(1);
    expect(remoteRoutes[0]?.path).toBe('');
    expect(typeof remoteRoutes[0]?.loadComponent).toBe('function');
  });
});
