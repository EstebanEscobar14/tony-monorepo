import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  TonStatDirective,
  TonStatTitleDirective,
  TonStatValueDirective,
  TonStatDescriptionDirective,
} from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { STAT_DOC_EN } from '../../i18n/en/pages/stat-doc';
import { STAT_DOC_ES } from '../../i18n/es/pages/stat-doc';

@Component({
  selector: 'docs-stat-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    TonStatDirective,
    TonStatTitleDirective,
    TonStatValueDirective,
    TonStatDescriptionDirective,
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
          <div class="flex gap-8">
            <div tonStat>
              <span tonStatTitle>Total Revenue</span>
              <span tonStatValue>$45,231</span>
              <span tonStatDescription variant="success">+20.1% from last month</span>
            </div>
            <div tonStat>
              <span tonStatTitle>Subscriptions</span>
              <span tonStatValue>+2,350</span>
              <span tonStatDescription>+180 since last hour</span>
            </div>
            <div tonStat>
              <span tonStatTitle>Active Now</span>
              <span tonStatValue>573</span>
              <span tonStatDescription variant="error">-12 since last hour</span>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">TonStatDescriptionDirective</h3>
        <docs-props-table [props]="descriptionProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().subDirectivesTitle }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().subDirectives; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class StatDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? STAT_DOC_ES : STAT_DOC_EN);

  importCode = `import {
  TonStatDirective,
  TonStatTitleDirective,
  TonStatValueDirective,
  TonStatDescriptionDirective,
} from '@tony-ui/core';`;

  basicCode = `<div tonStat>
  <span tonStatTitle>Total Revenue</span>
  <span tonStatValue>$45,231</span>
  <span tonStatDescription variant="success">+20.1% from last month</span>
</div>`;

  readonly descriptionProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'success' | 'error'", default: "'default'", description: this.t().descriptionPropDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().descriptionPropDescriptions.class },
  ]);
}
