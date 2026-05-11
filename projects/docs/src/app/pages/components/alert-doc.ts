import { Component, computed, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  TonAlertDirective,
  TonAlertTitleDirective,
  TonAlertDescriptionDirective,
  type AlertVariant,
} from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { ALERT_DOC_EN } from '../../i18n/en/pages/alert-doc';
import { ALERT_DOC_ES } from '../../i18n/es/pages/alert-doc';

@Component({
  selector: 'docs-alert-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    TonAlertDirective,
    TonAlertTitleDirective,
    TonAlertDescriptionDirective,
    TitleCasePipe,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.usage }}</h2>
        <docs-component-preview [code]="basicCode">
          <div tonAlert>
            <h5 tonAlertTitle>Heads up!</h5>
            <p tonAlertDescription>You can use alerts to show important messages.</p>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-4 w-full">
            @for (v of variants; track v) {
              <div tonAlert [variant]="v">
                <h5 tonAlertTitle>{{ v | titlecase }}</h5>
                <p tonAlertDescription>This is a {{ v }} alert message.</p>
              </div>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().dismissibleAlerts }}</h3>
        <docs-component-preview [code]="dismissCode">
          <div class="w-full">
            @if (showAlert()) {
              <div tonAlert variant="warning" #alertRef="tonAlert">
                <h5 tonAlertTitle>Warning</h5>
                <p tonAlertDescription>This alert can be dismissed.</p>
                <button
                  class="absolute right-2 top-2 rounded-md p-1 opacity-70 hover:opacity-100"
                  (click)="alertRef.dismiss(); showAlert.set(false)"
                >
                  ✕
                </button>
              </div>
            }
            @if (!showAlert()) {
              <button
                class="text-sm text-muted-foreground hover:text-foreground underline"
                (click)="showAlert.set(true)"
              >
                Show alert again
              </button>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <docs-props-table [props]="props()" />
      </section>
    </div>
  `,
})
export class AlertDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? ALERT_DOC_ES : ALERT_DOC_EN));

  variants: AlertVariant[] = ['default', 'destructive', 'success', 'warning', 'info'];
  readonly showAlert = signal(true);

  importCode = `import { TonAlertDirective, TonAlertTitleDirective, TonAlertDescriptionDirective } from '@tony-ui/core';`;

  basicCode = `<div tonAlert>
  <h5 tonAlertTitle>Heads up!</h5>
  <p tonAlertDescription>You can use alerts to show important messages.</p>
</div>`;

  variantsCode = `<div tonAlert variant="destructive">
  <h5 tonAlertTitle>Error</h5>
  <p tonAlertDescription>Something went wrong.</p>
</div>

<div tonAlert variant="success">
  <h5 tonAlertTitle>Success</h5>
  <p tonAlertDescription>Operation completed.</p>
</div>`;

  dismissCode = `<div tonAlert variant="warning" #alertRef="tonAlert">
  <h5 tonAlertTitle>Warning</h5>
  <p tonAlertDescription>This alert can be dismissed.</p>
  <button (click)="alertRef.dismiss()">✕</button>
</div>`;

  readonly props = computed<PropDef[]>(() => [
    {
      name: 'variant',
      type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
      default: "'default'",
      description: this.t().propDescriptions.variant,
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: this.t().propDescriptions.dismissible,
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: this.t().propDescriptions.class,
    },
  ]);
}
