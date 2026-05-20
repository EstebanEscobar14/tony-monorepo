import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  TonAlertDescriptionDirective,
  TonAlertDirective,
  TonAlertTitleDirective,
  TonButtonDirective,
} from '@tony-ui/core';
import { environment } from '../environments/environment';

const ANALYTICS_ELEMENT_TAG = 'mfe-analytics-root';
const ANALYTICS_SCRIPT_ID = 'mfe-analytics-element-script';
const ALLOWED_ANALYTICS_PROTOCOLS = new Set(['http:', 'https:']);
const ALLOWED_ANALYTICS_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  'capitalflow-mfe-analytics.onrender.com',
]);

function normalizeAnalyticsScriptUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl.trim(), window.location.origin);

    if (!ALLOWED_ANALYTICS_PROTOCOLS.has(url.protocol) || !ALLOWED_ANALYTICS_HOSTS.has(url.hostname)) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

@Component({
  selector: 'app-analytics-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TonAlertDescriptionDirective, TonAlertDirective, TonAlertTitleDirective, TonButtonDirective],
  templateUrl: './analytics-host.component.html',
  styleUrl: './analytics-host.component.css',
  host: {
    class: 'analytics-host-page',
  },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnalyticsHostComponent {
  readonly ready = signal(false);
  readonly loadFailed = signal(false);
  private readonly analyticsScriptUrl = environment.remotes.analyticsElementUrl;

  constructor() {
    void this.loadAnalyticsElement();
  }

  private async loadAnalyticsElement(): Promise<void> {
    this.loadFailed.set(false);

    if (customElements.get(ANALYTICS_ELEMENT_TAG)) {
      this.ready.set(true);
      return;
    }

    const safeScriptUrl = normalizeAnalyticsScriptUrl(this.analyticsScriptUrl);

    if (!safeScriptUrl) {
      this.loadFailed.set(true);
      return;
    }

    const existingScript = document.getElementById(ANALYTICS_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? this.createAnalyticsScript(safeScriptUrl);

    try {
      await new Promise<void>((resolve, reject) => {
        script.addEventListener('load', () => resolve(), { once: true });
        script.addEventListener('error', () => reject(new Error('Analytics remote failed to load')), {
          once: true,
        });

        if (!existingScript) {
          document.head.appendChild(script);
        }
      });

      this.ready.set(customElements.get(ANALYTICS_ELEMENT_TAG) != null);
      this.loadFailed.set(!this.ready());
    } catch {
      this.loadFailed.set(true);
    }
  }

  retry(): void {
    document.getElementById(ANALYTICS_SCRIPT_ID)?.remove();
    this.ready.set(false);
    void this.loadAnalyticsElement();
  }

  private createAnalyticsScript(safeScriptUrl: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.id = ANALYTICS_SCRIPT_ID;
    script.src = safeScriptUrl;
    script.async = true;
    return script;
  }
}
