import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { I18nService } from '../../i18n/i18n.service';
import { BREADCRUMB_DOC_EN } from '../../i18n/en/pages/breadcrumb-doc';
import { BREADCRUMB_DOC_ES } from '../../i18n/es/pages/breadcrumb-doc';
import {
  TonBreadcrumbDirective,
  TonBreadcrumbListDirective,
  TonBreadcrumbItemDirective,
  TonBreadcrumbLinkDirective,
  TonBreadcrumbSeparatorDirective,
  TonBreadcrumbPageDirective,
} from '@tony-ui/core';

@Component({
  selector: 'docs-breadcrumb-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    TonBreadcrumbDirective,
    TonBreadcrumbListDirective,
    TonBreadcrumbItemDirective,
    TonBreadcrumbLinkDirective,
    TonBreadcrumbSeparatorDirective,
    TonBreadcrumbPageDirective,
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
        <docs-component-preview [code]="basicCode" language="markup">
          <nav tonBreadcrumb>
            <ol tonBreadcrumbList>
              <li tonBreadcrumbItem>
                <a tonBreadcrumbLink href="#">Home</a>
              </li>
              <li tonBreadcrumbSeparator>/</li>
              <li tonBreadcrumbItem>
                <a tonBreadcrumbLink href="#">Components</a>
              </li>
              <li tonBreadcrumbSeparator>/</li>
              <li tonBreadcrumbItem>
                <span tonBreadcrumbPage>Breadcrumb</span>
              </li>
            </ol>
          </nav>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().dynamicBreadcrumb }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4">
            <nav tonBreadcrumb>
              <ol tonBreadcrumbList>
                @for (segment of segments(); track segment.label; let last = $last) {
                  <li tonBreadcrumbItem>
                    @if (last) {
                      <span tonBreadcrumbPage>{{ segment.label }}</span>
                    } @else {
                      <a tonBreadcrumbLink href="#">{{ segment.label }}</a>
                    }
                  </li>
                  @if (!last) {
                    <li tonBreadcrumbSeparator>/</li>
                  }
                }
              </ol>
            </nav>
            <div class="flex gap-2">
              <button
                class="text-xs text-muted-foreground hover:text-foreground underline"
                (click)="pushSegment()"
              >
                Add segment
              </button>
              <button
                class="text-xs text-muted-foreground hover:text-foreground underline"
                (click)="popSegment()"
              >
                Remove segment
              </button>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class BreadcrumbDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? BREADCRUMB_DOC_ES : BREADCRUMB_DOC_EN);

  private counter = 0;
  readonly segments = signal([
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Components', href: '/docs/components' },
  ]);

  importCode = `import {
  TonBreadcrumbDirective,
  TonBreadcrumbListDirective,
  TonBreadcrumbItemDirective,
  TonBreadcrumbLinkDirective,
  TonBreadcrumbSeparatorDirective,
  TonBreadcrumbPageDirective,
} from '@tony-ui/core';`;

  basicCode = `<nav tonBreadcrumb>
  <ol tonBreadcrumbList>
    <li tonBreadcrumbItem>
      <a tonBreadcrumbLink href="#">Home</a>
    </li>
    <li tonBreadcrumbSeparator>/</li>
    <li tonBreadcrumbItem>
      <span tonBreadcrumbPage>Current</span>
    </li>
  </ol>
</nav>`;

  exampleCode = `readonly segments = signal([
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
]);

@for (segment of segments(); track segment.label; let last = $last) {
  @if (last) {
    <span tonBreadcrumbPage>{{ segment.label }}</span>
  } @else {
    <a tonBreadcrumbLink [href]="segment.href">{{ segment.label }}</a>
  }
}`;

  pushSegment(): void {
    this.counter++;
    this.segments.update(s => [...s, { label: 'Page ' + this.counter, href: '#' }]);
  }

  popSegment(): void {
    this.segments.update(s => (s.length > 1 ? s.slice(0, -1) : s));
  }
}
