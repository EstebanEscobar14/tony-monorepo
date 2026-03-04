import { describe, expect, it } from 'vitest';
import { PaymentsPageComponent } from './payments-page.component';

describe('PaymentsPageComponent', () => {
  it('adds a new payment at the beginning of the batch', () => {
    const component = new PaymentsPageComponent();
    const initialLength = component.payments().length;

    component.addPayment();

    expect(component.payments()).toHaveLength(initialLength + 1);
    expect(component.payments()[0].id).toBe(`PAY-${1042 + initialLength}`);
    expect(component.feedback()).toContain('agregado');
  });
});
