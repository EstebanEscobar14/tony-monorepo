import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlSegment, UrlTree } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { saveAuthSession } from '@tony-ui/utils';
import { requireSession } from './auth.guard';

describe('requireSession', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('redirects to auth when there is no session', () => {
    const router = TestBed.inject(Router);

    const result = TestBed.runInInjectionContext(() =>
      requireSession(['admin'])({} as never, [new UrlSegment('admin', {})])
    );

    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result as UrlTree)).toBe('/auth?redirect=%2Fadmin');
  });

  it('allows matching when the user has an allowed role', () => {
    saveAuthSession({ username: 'candidate', role: 'admin' });

    const result = TestBed.runInInjectionContext(() =>
      requireSession(['admin'])({} as never, [new UrlSegment('admin', {})])
    );

    expect(result).toBe(true);
  });

  it('rejects expired or tampered sessions from storage', () => {
    const router = TestBed.inject(Router);

    localStorage.setItem(
      'tony.auth.session',
      JSON.stringify({
        username: 'candidate',
        displayName: 'Candidate',
        role: 'admin',
        permissions: ['*'],
        loggedAt: '2024-01-01T00:00:00.000Z',
        expiresAt: '2024-01-01T08:00:00.000Z',
      })
    );

    const result = TestBed.runInInjectionContext(() =>
      requireSession(['admin'])({} as never, [new UrlSegment('admin', {})])
    );

    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result as UrlTree)).toBe('/auth?redirect=%2Fadmin');
    expect(localStorage.getItem('tony.auth.session')).toBeNull();
  });
});
