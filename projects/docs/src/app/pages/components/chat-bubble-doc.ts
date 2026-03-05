import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import {
  TonChatBubbleDirective,
  TonChatBubbleAvatarDirective,
  TonChatBubbleBodyDirective,
  TonChatBubbleContentDirective,
  TonChatBubbleHeaderDirective,
  TonChatBubbleFooterDirective,
} from '@tony-ui/core';
import { I18nService } from '../../i18n/i18n.service';
import { CHAT_BUBBLE_DOC_EN } from '../../i18n/en/pages/chat-bubble-doc';
import { CHAT_BUBBLE_DOC_ES } from '../../i18n/es/pages/chat-bubble-doc';

@Component({
  selector: 'docs-chat-bubble-doc',
  standalone: true,
  imports: [
    CodeBlockComponent,
    ComponentPreviewComponent,
    PropsTableComponent,
    TonChatBubbleDirective,
    TonChatBubbleAvatarDirective,
    TonChatBubbleBodyDirective,
    TonChatBubbleContentDirective,
    TonChatBubbleHeaderDirective,
    TonChatBubbleFooterDirective,
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
          <div class="max-w-md w-full space-y-2">
            <div tonChatBubble>
              <div tonChatBubbleAvatar>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="Alice" class="w-full h-full" />
              </div>
              <div tonChatBubbleBody>
                <span tonChatBubbleHeader>Alice</span>
                <div tonChatBubbleContent>Hey, how are you?</div>
                <span tonChatBubbleFooter>10:00 AM</span>
              </div>
            </div>
            <div tonChatBubble align="end">
              <div tonChatBubbleAvatar>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" class="w-full h-full" />
              </div>
              <div tonChatBubbleBody>
                <span tonChatBubbleHeader>You</span>
                <div tonChatBubbleContent variant="primary">I'm doing great, thanks!</div>
                <span tonChatBubbleFooter>10:01 AM</span>
              </div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.variants }}</h2>
        <docs-component-preview [code]="variantsCode" language="markup">
          <div class="max-w-md w-full space-y-2">
            <div tonChatBubble>
              <div tonChatBubbleBody>
                <div tonChatBubbleContent>Default</div>
              </div>
            </div>
            <div tonChatBubble>
              <div tonChatBubbleBody>
                <div tonChatBubbleContent variant="primary">Primary</div>
              </div>
            </div>
            <div tonChatBubble>
              <div tonChatBubbleBody>
                <div tonChatBubbleContent variant="secondary">Secondary</div>
              </div>
            </div>
            <div tonChatBubble>
              <div tonChatBubbleBody>
                <div tonChatBubbleContent variant="accent">Accent</div>
              </div>
            </div>
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">TonChatBubbleDirective</h3>
        <docs-props-table [props]="chatBubbleProps()" />
        <h3 class="text-lg font-medium mt-4">TonChatBubbleContentDirective</h3>
        <docs-props-table [props]="contentProps()" />
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
export class ChatBubbleDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? CHAT_BUBBLE_DOC_ES : CHAT_BUBBLE_DOC_EN);

  importCode = `import {
  TonChatBubbleDirective,
  TonChatBubbleAvatarDirective,
  TonChatBubbleBodyDirective,
  TonChatBubbleContentDirective,
  TonChatBubbleHeaderDirective,
  TonChatBubbleFooterDirective,
} from '@tony-ui/core';`;

  basicCode = `<div tonChatBubble>
  <div tonChatBubbleAvatar>
    <img src="avatar.png" alt="Alice" />
  </div>
  <div tonChatBubbleBody>
    <span tonChatBubbleHeader>Alice</span>
    <div tonChatBubbleContent>Hey, how are you?</div>
    <span tonChatBubbleFooter>10:00 AM</span>
  </div>
</div>
<div tonChatBubble align="end">
  <div tonChatBubbleAvatar>
    <img src="avatar2.png" alt="You" />
  </div>
  <div tonChatBubbleBody>
    <span tonChatBubbleHeader>You</span>
    <div tonChatBubbleContent variant="primary">I'm doing great!</div>
    <span tonChatBubbleFooter>10:01 AM</span>
  </div>
</div>`;

  variantsCode = `<div tonChatBubble>
  <div tonChatBubbleBody>
    <div tonChatBubbleContent>Default</div>
  </div>
</div>
<div tonChatBubble>
  <div tonChatBubbleBody>
    <div tonChatBubbleContent variant="primary">Primary</div>
  </div>
</div>`;

  readonly chatBubbleProps = computed<PropDef[]>(() => [
    { name: 'align', type: "'start' | 'end'", default: "'start'", description: this.t().propDescriptions.align },
    { name: 'class', type: 'string', default: "''", description: this.t().propDescriptions.class },
  ]);

  readonly contentProps = computed<PropDef[]>(() => [
    { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'accent'", default: "'default'", description: this.t().contentPropDescriptions.variant },
    { name: 'class', type: 'string', default: "''", description: this.t().contentPropDescriptions.class },
  ]);
}
