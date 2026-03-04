import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { TonLinkDirective } from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { LINK_DOC_EN } from '../../i18n/en/pages/link-doc';
import { LINK_DOC_ES } from '../../i18n/es/pages/link-doc';

@Component({
  selector: 'docs-link-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, TonLinkDirective],
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
          <a tonLink href="#">Click me</a>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="flex items-center gap-4">
            <a tonLink href="#">Default</a>
            <a tonLink variant="primary" href="#">Primary</a>
            <a tonLink variant="secondary" href="#">Secondary</a>
            <a tonLink variant="hover" href="#">Hover</a>
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
export class LinkDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? LINK_DOC_ES : LINK_DOC_EN);

  importCode = `import { TonLinkDirective } from '@tony-ui/core';`;
  basicCode = `<a tonLink href="#">Click me</a>`;
  variantsCode = `<a tonLink href="#">Default</a>
<a tonLink variant="primary" href="#">Primary</a>
<a tonLink variant="secondary" href="#">Secondary</a>
<a tonLink variant="hover" href="#">Hover</a>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'hover'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
