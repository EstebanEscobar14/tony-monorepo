import { Component, signal, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { TonBadgeDirective, type BadgeVariant } from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { BADGE_DOC_EN } from '../../i18n/en/pages/badge-doc';
import { BADGE_DOC_ES } from '../../i18n/es/pages/badge-doc';

@Component({
  selector: 'docs-badge-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, TonBadgeDirective],
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
          <span tonBadge>Badge</span>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          @for (v of variants; track v) {
            <span tonBadge [variant]="v">{{ v }}</span>
          }
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.sizes }}</h2>
        <docs-component-preview [code]="sizesCode">
          <span tonBadge size="sm">Small</span>
          <span tonBadge size="md">Medium</span>
          <span tonBadge size="lg">Large</span>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().statusDashboard }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span>API Server</span>
              <span tonBadge [variant]="status()">{{ status() }}</span>
            </div>
            <button
              class="text-xs text-muted-foreground hover:text-foreground underline"
              (click)="cycleStatus()"
            >
              Toggle Status
            </button>
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
export class BadgeDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? BADGE_DOC_ES : BADGE_DOC_EN);

  variants: BadgeVariant[] = ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'];
  readonly status = signal<BadgeVariant>('success');
  private statusCycle: BadgeVariant[] = ['success', 'warning', 'destructive', 'default'];
  private statusIndex = 0;

  cycleStatus(): void {
    this.statusIndex = (this.statusIndex + 1) % this.statusCycle.length;
    this.status.set(this.statusCycle[this.statusIndex]);
  }

  importCode = `import { TonBadgeDirective } from '@tony-ui/core';`;
  basicCode = `<span tonBadge>Badge</span>`;
  variantsCode = `<span tonBadge>Default</span>
<span tonBadge variant="secondary">Secondary</span>
<span tonBadge variant="outline">Outline</span>
<span tonBadge variant="destructive">Destructive</span>
<span tonBadge variant="success">Success</span>
<span tonBadge variant="warning">Warning</span>`;
  sizesCode = `<span tonBadge size="sm">Small</span>
<span tonBadge size="md">Medium</span>
<span tonBadge size="lg">Large</span>`;
  exampleCode = `readonly status = signal<BadgeVariant>('success');

<span tonBadge [variant]="status()">{{ status() }}</span>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: this.t().propDescriptions.size },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
