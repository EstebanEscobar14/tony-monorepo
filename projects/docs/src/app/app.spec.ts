import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

describe('Docs App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  it('starts on the home layout and keeps the sidebar closed by default', () => {
    const component = TestBed.runInInjectionContext(() => new App());

    expect(component.isHome()).toBe(true);
    expect(component.sidebarOpen()).toBe(false);
  });
});
