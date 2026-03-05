import {
  type EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { ThemeService } from './theme.service';

export interface TonyConfig {
  prefix?: string;
  defaultTheme?: 'light' | 'dark' | 'corporate' | 'system';
}

const DEFAULT_CONFIG: TonyConfig = { prefix: 'ton', defaultTheme: 'light' };

export const SNY_CONFIG = new InjectionToken<TonyConfig>('SNY_CONFIG', {
  providedIn: 'root',
  factory: () => DEFAULT_CONFIG,
});

export function provideTonyUI(config: Partial<TonyConfig> = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: SNY_CONFIG, useValue: { ...DEFAULT_CONFIG, ...config } },
    provideEnvironmentInitializer(() => inject(ThemeService)),
  ]);
}
