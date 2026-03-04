import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { TonFieldsetDirective, TonFieldsetLegendDirective, TonFieldsetContentDirective, TonInputDirective, TonLabelDirective } from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { FIELDSET_DOC_EN } from '../../i18n/en/pages/fieldset-doc';
import { FIELDSET_DOC_ES } from '../../i18n/es/pages/fieldset-doc';

@Component({
  selector: 'docs-fieldset-doc',
  standalone: true,
  imports: [CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, TonFieldsetDirective, TonFieldsetLegendDirective, TonFieldsetContentDirective, TonInputDirective, TonLabelDirective],
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
          <fieldset tonFieldset class="w-full max-w-sm">
            <legend tonFieldsetLegend>Personal Information</legend>
            <div tonFieldsetContent>
              <div class="space-y-2">
                <label tonLabel>Name</label>
                <input tonInput placeholder="Enter your name" />
              </div>
              <div class="space-y-2">
                <label tonLabel>Email</label>
                <input tonInput type="email" placeholder="you&#64;example.com" />
              </div>
            </div>
          </fieldset>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode">
          <div class="space-y-4 w-full max-w-sm">
            <fieldset tonFieldset>
              <legend tonFieldsetLegend>Default</legend>
              <div tonFieldsetContent>
                <input tonInput placeholder="Default fieldset" />
              </div>
            </fieldset>
            <fieldset tonFieldset variant="bordered">
              <legend tonFieldsetLegend>Bordered</legend>
              <div tonFieldsetContent>
                <input tonInput placeholder="Bordered fieldset" />
              </div>
            </fieldset>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().tonFieldsetDirective }}</h3>
        <docs-props-table [props]="fieldsetProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().tonFieldsetLegendDirective }}</h3>
        <docs-props-table [props]="legendProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().tonFieldsetContentDirective }}</h3>
        <docs-props-table [props]="contentProps()" />
      </section>
    </div>
  `,
})
export class FieldsetDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? FIELDSET_DOC_ES : FIELDSET_DOC_EN);

  importCode = `import {
  TonFieldsetDirective,
  TonFieldsetLegendDirective,
  TonFieldsetContentDirective,
} from '@tony-ui/core';`;

  basicCode = `<fieldset tonFieldset>
  <legend tonFieldsetLegend>Personal Information</legend>
  <div tonFieldsetContent>
    <div class="space-y-2">
      <label tonLabel>Name</label>
      <input tonInput placeholder="Enter your name" />
    </div>
    <div class="space-y-2">
      <label tonLabel>Email</label>
      <input tonInput type="email" placeholder="you@example.com" />
    </div>
  </div>
</fieldset>`;

  variantsCode = `<fieldset tonFieldset>
  <legend tonFieldsetLegend>Default</legend>
  <div tonFieldsetContent>
    <input tonInput placeholder="Default fieldset" />
  </div>
</fieldset>

<fieldset tonFieldset variant="bordered">
  <legend tonFieldsetLegend>Bordered</legend>
  <div tonFieldsetContent>
    <input tonInput placeholder="Bordered fieldset" />
  </div>
</fieldset>`;

  readonly fieldsetProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'bordered'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'disabled', type: 'boolean', default: 'false', description: this.t().propDescriptions.disabled },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly legendProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().legendPropDescriptions.class },
  ]);

  readonly contentProps = computed<PropDef[]>(() => [
    { name: 'class', type: 'string', default: "''", description: this.t().contentPropDescriptions.class },
  ]);
}
