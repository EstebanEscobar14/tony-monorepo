import { describe, expect, it, vi } from 'vitest';

vi.mock('./dashboard', () => ({
  AnalyticsDashboard: () => <div data-testid="analytics-dashboard" />,
}));

describe('mfe-analytics React entry', () => {
  it('returns the dashboard component from App', async () => {
    const { App } = await import('./app');

    const element = App();

    expect(element).toBeTruthy();
  });

  it('registers the analytics custom element only once', async () => {
    const { defineAnalyticsElement } = await import('./analytics-element');

    defineAnalyticsElement();
    defineAnalyticsElement();

    expect(customElements.get('mfe-analytics-root')).toBeDefined();
  });
});
