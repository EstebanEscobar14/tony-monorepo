import { Component, computed, inject, signal } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  TonDropdownDirective,
  TonDropdownTriggerDirective,
  TonDropdownContentDirective,
  TonMenuItemDirective,
  TonMenuSeparatorDirective,
  TonMenuLabelDirective,
} from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { DROPDOWN_DOC_EN } from '../../i18n/en/pages/dropdown-doc';
import { DROPDOWN_DOC_ES } from '../../i18n/es/pages/dropdown-doc';

@Component({
  selector: 'docs-dropdown-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    TonDropdownDirective,
    TonDropdownTriggerDirective,
    TonDropdownContentDirective,
    TonMenuItemDirective,
    TonMenuSeparatorDirective,
    TonMenuLabelDirective,
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
          <div class="min-h-[280px] flex items-start justify-center pt-4">
          <div tonDropdown>
            <button
              tonDropdownTrigger
              class="rounded-md border px-4 py-2 text-sm"
            >
              Open Menu
            </button>
            <div tonDropdownContent>
              <div tonMenuLabel>Actions</div>
              <div tonMenuItem>Edit</div>
              <div tonMenuItem>Duplicate</div>
              <div tonMenuSeparator></div>
              <div tonMenuItem variant="destructive">Delete</div>
            </div>
          </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <h3 class="text-lg font-medium">Interactive Actions</h3>
        <docs-component-preview [code]="exampleCode" language="typescript">
          <div class="min-h-[280px] flex flex-col items-center pt-4 gap-4">
            <div tonDropdown>
              <button
                tonDropdownTrigger
                class="rounded-md border px-4 py-2 text-sm"
              >
                File
              </button>
              <div tonDropdownContent>
                <div tonMenuLabel>Document</div>
                <div tonMenuItem (click)="onAction('New File')">New File</div>
                <div tonMenuItem (click)="onAction('Open')">Open</div>
                <div tonMenuItem (click)="onAction('Save')">Save</div>
                <div tonMenuSeparator></div>
                <div tonMenuItem (click)="onAction('Export as PDF')">Export as PDF</div>
                <div tonMenuSeparator></div>
                <div tonMenuItem variant="destructive" (click)="onAction('Delete')">Delete</div>
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              Last action: {{ lastAction() || 'None' }}
            </p>
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
export class DropdownDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => (this.i18n.locale() === 'es' ? DROPDOWN_DOC_ES : DROPDOWN_DOC_EN));

  importCode = `import {
  TonDropdownDirective,
  TonDropdownTriggerDirective,
  TonDropdownContentDirective,
  TonMenuItemDirective,
  TonMenuSeparatorDirective,
  TonMenuLabelDirective,
} from '@tony-ui/core';`;

  basicCode = `<div tonDropdown>
  <button tonDropdownTrigger>Open Menu</button>
  <div tonDropdownContent>
    <div tonMenuLabel>Actions</div>
    <div tonMenuItem>Edit</div>
    <div tonMenuItem>Duplicate</div>
    <div tonMenuSeparator></div>
    <div tonMenuItem variant="destructive">Delete</div>
  </div>
</div>`;

  readonly lastAction = signal('');

  onAction(action: string): void {
    this.lastAction.set(action);
  }

  exampleCode = `readonly lastAction = signal('');

onAction(action: string): void {
  this.lastAction.set(action);
}

<div tonDropdown>
  <button tonDropdownTrigger>File</button>
  <div tonDropdownContent>
    <div tonMenuLabel>Document</div>
    <div tonMenuItem (click)="onAction('New File')">New File</div>
    <div tonMenuItem (click)="onAction('Open')">Open</div>
    <div tonMenuItem (click)="onAction('Save')">Save</div>
    <div tonMenuSeparator></div>
    <div tonMenuItem (click)="onAction('Export as PDF')">Export as PDF</div>
    <div tonMenuSeparator></div>
    <div tonMenuItem variant="destructive" (click)="onAction('Delete')">Delete</div>
  </div>
</div>
<p>Last action: {{ lastAction() }}</p>`;

  readonly props = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: this.t().propDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);
}
