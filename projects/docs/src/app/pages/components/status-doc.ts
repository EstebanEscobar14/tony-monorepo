import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { TonStatusDirective } from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { STATUS_DOC_EN } from '../../i18n/en/pages/status-doc';
import { STATUS_DOC_ES } from '../../i18n/es/pages/status-doc';

@Component({
  selector: 'docs-status-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, TonStatusDirective],
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
          <div class="flex items-center gap-2">
            <span tonStatus></span>
            <span class="text-sm">Active</span>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <span tonStatus variant="default"></span>
              <span class="text-sm">Default</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus variant="success"></span>
              <span class="text-sm">Success</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus variant="warning"></span>
              <span class="text-sm">Warning</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus variant="error"></span>
              <span class="text-sm">Error</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus variant="info"></span>
              <span class="text-sm">Info</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus variant="neutral"></span>
              <span class="text-sm">Neutral</span>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <span tonStatus size="xs"></span>
              <span class="text-sm">xs</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus size="sm"></span>
              <span class="text-sm">sm</span>
            </div>
            <div class="flex items-center gap-2">
              <span tonStatus size="md"></span>
              <span class="text-sm">md</span>
            </div>
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
export class StatusDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? STATUS_DOC_ES : STATUS_DOC_EN);

  importCode = `import { TonStatusDirective } from '@tony-ui/core';`;

  basicCode = `<span tonStatus></span>`;

  variantsCode = `<span tonStatus variant="default"></span>
<span tonStatus variant="success"></span>
<span tonStatus variant="warning"></span>
<span tonStatus variant="error"></span>
<span tonStatus variant="info"></span>
<span tonStatus variant="neutral"></span>`;

  sizesCode = `<span tonStatus size="xs"></span>
<span tonStatus size="sm"></span>
<span tonStatus size="md"></span>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'pulse', type: 'boolean', default: 'false', description: this.t().propDescriptions.pulse },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
