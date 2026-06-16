import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  TonButtonDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
  TonCardDescriptionDirective,
  TonCardContentDirective,
  TonInputDirective,
} from '@tony-ui/core';
import { CodeBlockComponent } from '../shared/code-block';
import { I18nService } from '../i18n/i18n.service';
import { HOME_EN } from '../i18n/en/home';
import { HOME_ES } from '../i18n/es/home';
import { BrandLogoComponent } from '../shared/brand-logo';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [
    RouterLink,
    TonButtonDirective,
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
    TonCardDescriptionDirective,
    TonCardContentDirective,
    TonInputDirective,
    CodeBlockComponent,
    BrandLogoComponent,
  ],
  template: `
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32 lg:py-40">
        <div class="mx-auto mb-8 flex justify-center">
          <docs-brand-logo [size]="128" label="Capital Flow logo" />
        </div>
        <h1 class="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span class="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">{{ t().hero.title }}</span>
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {{ t().hero.description }}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.angular }}</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.tailwind }}</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.zoneless }}</span>
          <span class="rounded-full border border-primary/20 bg-primary/10 text-primary px-3 py-1 font-medium">{{ t().badges.signals }}</span>
          <span class="rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 px-3 py-1 font-medium">{{ t().badges.alpha }}</span>
          <a href="llms.txt" target="_blank" class="rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-600 px-3 py-1 font-medium hover:bg-violet-500/20 transition-colors no-underline">AI Ready</a>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a tonBtn size="lg" [routerLink]="i18n.localizeLink('/docs/getting-started/installation')">{{ t().hero.getStarted }}</a>
          <a tonBtn variant="outline" size="lg" [routerLink]="i18n.localizeLink('/docs/components/button')">{{ t().hero.viewComponents }}</a>
        </div>
      </div>
    </section>

    <!-- What It Solves -->
    <section class="border-b border-border bg-muted/30">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().whatItSolves.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().whatItSolves.subtitle }}</p>
        <div class="mt-12 grid gap-6 sm:grid-cols-3">
          @for (item of t().problems; track item.problem) {
            <div tonCard padding="md" class="text-center">
              <p class="text-sm font-medium text-destructive/80 line-through">{{ item.problem }}</p>
              <div class="my-3 text-2xl"></div>
              <p class="text-sm font-semibold text-primary">{{ item.solution }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Component Showcase -->
    <section class="border-b border-border bg-muted/30">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().showcase.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().showcase.subtitle }}</p>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Buttons -->
          <div tonCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">{{ t().showcase.buttons }}</h3>
            <div class="flex flex-wrap gap-2">
              <button tonBtn size="sm">Default</button>
              <button tonBtn variant="secondary" size="sm">Secondary</button>
              <button tonBtn variant="outline" size="sm">Outline</button>
              <button tonBtn variant="destructive" size="sm">Destructive</button>
              <button tonBtn variant="ghost" size="sm">Ghost</button>
            </div>
          </div>

          <!-- Card -->
          <div tonCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">{{ t().showcase.card }}</h3>
            <div tonCard variant="outline" class="p-0">
              <div tonCardHeader>
                <h4 tonCardTitle class="text-sm">{{ t().showcase.nestedCard }}</h4>
                <p tonCardDescription>{{ t().showcase.nestedCardDesc }}</p>
              </div>
              <div tonCardContent>
                <p class="text-xs text-muted-foreground">{{ t().showcase.composableCardDirectives }}</p>
              </div>
            </div>
          </div>

          <!-- Input -->
          <div tonCard padding="md" class="space-y-4">
            <h3 class="text-sm font-semibold text-muted-foreground">{{ t().showcase.input }}</h3>
            <div class="space-y-2">
              <input tonInput [placeholder]="t().showcase.defaultInput" />
              <input tonInput variant="error" [placeholder]="t().showcase.errorState" />
            </div>
          </div>
        </div>
        <div class="mt-8 text-center">
          <a tonBtn variant="outline" [routerLink]="i18n.localizeLink('/docs/components/button')">
            {{ t().showcase.seeAll }}
          </a>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="border-b border-border">
      <div class="mx-auto max-w-4xl px-6 py-20">
        <h2 class="text-center text-3xl font-bold tracking-tight">{{ t().quickStart.title }}</h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{{ t().quickStart.subtitle }}</p>
        <div class="mt-12 space-y-6">
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">{{ t().quickStart.step1 }}</h3>
            <docs-code-block [code]="installCode" language="bash" />
          </div>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">{{ t().quickStart.step2 }}</h3>
            <docs-code-block [code]="importCode" language="typescript" />
          </div>
          <div class="space-y-2">
            <h3 class="text-sm font-semibold">{{ t().quickStart.step3 }}</h3>
            <docs-code-block [code]="useCode" language="markup" />
          </div>
        </div>
      </div>
    </section>

    <!-- Footer CTA -->
    <section>
      <div class="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 class="text-3xl font-bold tracking-tight">{{ t().footer.title }}</h2>
        <p class="mx-auto mt-3 max-w-xl text-muted-foreground">
          {{ t().footer.subtitle }}
        </p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <a tonBtn size="lg" [routerLink]="i18n.localizeLink('/docs/getting-started/installation')">{{ t().footer.readDocs }}</a>
        </div>
      </div>
    </section>
  `,
})
export class HomeComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? HOME_ES : HOME_EN);
  readonly installCopied = signal(false);

  installCode = `ng add @tony-ui/core`;
  importCode = `import { TonButtonDirective } from '@tony-ui/core';`;
  useCode = `<button tonBtn variant="default">Click me</button>
<button tonBtn variant="outline">Outline</button>
<button tonBtn variant="destructive">Delete</button>`;

  copyInstall(): void {
    navigator.clipboard.writeText('ng add @tony-ui/core');
    this.installCopied.set(true);
    setTimeout(() => this.installCopied.set(false), 2000);
  }
}
