import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { OnboardingPageComponent } from './onboarding-page.component';

describe('OnboardingPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('shows validation feedback when the form is invalid', () => {
    const component = TestBed.runInInjectionContext(() => new OnboardingPageComponent());

    component.createRequest();

    expect(component.onboardingForm.invalid).toBe(true);
    expect(component.feedback()).toContain('Revisa las validaciones');
  });

  it('creates a request when the form is valid', () => {
    const component = TestBed.runInInjectionContext(() => new OnboardingPageComponent());
    const initialLength = component.requests().length;

    component.onboardingForm.setValue({
      company: 'Capital Flow Labs',
      contact: 'Juan Escobar',
      region: 'Iberia',
      notes: 'Solicitud completa con informacion suficiente.',
    });

    component.createRequest();

    expect(component.requests()).toHaveLength(initialLength + 1);
    expect(component.requests()[0].status).toBe('Draft');
    expect(component.feedback()).toContain('creada');
  });
});
