import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthPageComponent } from './auth-page.component';

describe('AuthPageComponent', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('marks the form and updates the status when submit is invalid', () => {
    const component = TestBed.runInInjectionContext(() => new AuthPageComponent());

    component.loginForm.setValue({
      username: '',
      password: '',
      role: 'operator',
    });

    component.submit();

    expect(component.loginForm.invalid).toBe(true);
    expect(component.statusMessage()).toContain('Completa usuario');
  });

  it('creates a session and navigates to the role destination when submit is valid', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const component = TestBed.runInInjectionContext(() => new AuthPageComponent());

    component.loginForm.setValue({
      username: 'Juan Escobar',
      password: 'tony-ui',
      role: 'admin',
    });

    component.submit();

    expect(component.session()?.role).toBe('admin');
    expect(component.statusMessage()).toContain('Sesion iniciada');
    expect(navigateSpy).toHaveBeenCalledWith('/admin');
  });
});
