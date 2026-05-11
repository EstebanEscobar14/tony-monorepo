import { describe, expect, it } from 'vitest';
import { AdminPageComponent } from './admin-page.component';

describe('AdminPageComponent', () => {
  it('builds admin metrics and settings for the dashboard', () => {
    const component = new AdminPageComponent();

    expect(component.metrics.length).toBeGreaterThan(0);
    expect(component.settings.length).toBeGreaterThan(0);
  });
});
