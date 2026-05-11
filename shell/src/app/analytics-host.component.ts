import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  TonAlertDescriptionDirective,
  TonAlertDirective,
  TonAlertTitleDirective,
} from '@tony-ui/core';
import { environment } from '../environments/environment';

const ANALYTICS_ELEMENT_TAG = 'mfe-analytics-root';
const ANALYTICS_SCRIPT_ID = 'mfe-analytics-element-script';

@Component({
  selector: 'app-analytics-host',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TonAlertDescriptionDirective, TonAlertDirective, TonAlertTitleDirective],
  templateUrl: './analytics-host.component.html',
  styleUrl: './analytics-host.component.css',
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
    if (customElements.get(ANALYTICS_ELEMENT_TAG)) {
      this.ready.set(true);
      return;
    }

    const existingScript = document.getElementById(ANALYTICS_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? this.createAnalyticsScript();

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

  private createAnalyticsScript(): HTMLScriptElement {
    const script = document.createElement('script');
    script.id = ANALYTICS_SCRIPT_ID;
    script.src = this.analyticsScriptUrl;
    script.async = true;
    return script;
  }
}
