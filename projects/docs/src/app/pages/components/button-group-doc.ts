import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { I18nService } from '../../i18n/i18n.service';
import { BUTTON_GROUP_DOC_EN } from '../../i18n/en/pages/button-group-doc';
import { BUTTON_GROUP_DOC_ES } from '../../i18n/es/pages/button-group-doc';
import { TonButtonGroupDirective, TonButtonDirective } from '@tony-ui/core';

@Component({
  selector: 'docs-button-group-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, TonButtonGroupDirective, TonButtonDirective],
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
          <div tonButtonGroup>
            <button tonBtn variant="outline">Left</button>
            <button tonBtn variant="outline">Center</button>
            <button tonBtn variant="outline">Right</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().vertical }}</h2>
        <docs-component-preview [code]="verticalCode">
          <div tonButtonGroup orientation="vertical">
            <button tonBtn variant="outline">Top</button>
            <button tonBtn variant="outline">Middle</button>
            <button tonBtn variant="outline">Bottom</button>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">{{ t().viewModeToggle }}</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="space-y-4">
            <div tonButtonGroup>
              @for (view of views; track view) {
                <button
                  tonBtn
                  [variant]="activeView() === view ? 'default' : 'outline'"
                  (click)="activeView.set(view)"
                >
                  {{ view }}
                </button>
              }
            </div>
            <p class="text-sm text-muted-foreground">Active view: {{ activeView() }}</p>
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
export class ButtonGroupDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? BUTTON_GROUP_DOC_ES : BUTTON_GROUP_DOC_EN);

  views = ['Grid', 'List', 'Table'];
  readonly activeView = signal('Grid');

  importCode = `import { TonButtonGroupDirective } from '@tony-ui/core';`;
  basicCode = `<div tonButtonGroup>
  <button tonBtn variant="outline">Left</button>
  <button tonBtn variant="outline">Center</button>
  <button tonBtn variant="outline">Right</button>
</div>`;
  verticalCode = `<div tonButtonGroup orientation="vertical">
  <button tonBtn variant="outline">Top</button>
  <button tonBtn variant="outline">Middle</button>
  <button tonBtn variant="outline">Bottom</button>
</div>`;
  exampleCode = `readonly activeView = signal('Grid');

<div tonButtonGroup>
  @for (view of views; track view) {
    <button tonBtn
      [variant]="activeView() === view ? 'default' : 'outline'"
      (click)="activeView.set(view)">
      {{ view }}
    </button>
  }
</div>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: this.t().propDescriptions.orientation },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
