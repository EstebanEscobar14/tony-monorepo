import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['apps/mfe-analytics/src/**/*.spec.tsx'],
  },
});
