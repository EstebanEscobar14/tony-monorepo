import { describe, expect, it } from 'vitest';
import { CompliancePageComponent } from './compliance-page.component';

describe('CompliancePageComponent', () => {
  it('filters cases by query text', () => {
    const component = new CompliancePageComponent();
    const targetCase = component.cases()[0];

    component.setQuery(targetCase.id);

    expect(component.cases().length).toBeGreaterThan(0);
    expect(component.cases().every((item) => item.id.includes(targetCase.id))).toBe(true);
  });
});
