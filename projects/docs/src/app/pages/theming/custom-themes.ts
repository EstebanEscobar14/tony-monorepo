import { Component, computed, inject } from '@angular/core';
import { CodeBlockComponent } from '../../shared/code-block';
import { I18nService } from '../../i18n/i18n.service';
import { THEMING_CUSTOM_THEMES_EN } from '../../i18n/en/pages/theming-custom-themes';
import { THEMING_CUSTOM_THEMES_ES } from '../../i18n/es/pages/theming-custom-themes';

@Component({
  selector: 'docs-custom-themes',
  standalone: true,
  imports: [CodeBlockComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().creatingTheme }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().creatingThemeDesc"></p>
        <docs-code-block [code]="themeCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().applyingTheme }}</h2>
        <p class="text-sm text-muted-foreground" [innerHTML]="t().applyingThemeDesc"></p>
        <docs-code-block [code]="applyCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().builtInCorporate }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().builtInCorporateDesc }}</p>
        <docs-code-block [code]="corporateCode" language="css" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().tokenReference }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().tokenReferenceDesc }}</p>
        <docs-code-block [code]="tokensCode" language="css" />
      </section>
    </div>
  `,
})
export class CustomThemesComponent {
  private readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? THEMING_CUSTOM_THEMES_ES : THEMING_CUSTOM_THEMES_EN);

  themeCode = `[data-theme="ocean"] {
  --ton-background: #0c1222;
  --ton-foreground: #e2e8f0;
  --ton-primary: #38bdf8;
  --ton-primary-foreground: #0c1222;
  --ton-secondary: #1e293b;
  --ton-secondary-foreground: #e2e8f0;
  --ton-muted: #1e293b;
  --ton-muted-foreground: #94a3b8;
  --ton-accent: #1e3a5f;
  --ton-accent-foreground: #e2e8f0;
  --ton-destructive: #ef4444;
  --ton-destructive-foreground: #ffffff;
  --ton-card: #0f172a;
  --ton-card-foreground: #e2e8f0;
  --ton-border: #1e293b;
  --ton-input: #1e293b;
  --ton-ring: #38bdf8;
}`;

  applyCode = `// Extend the Theme type if needed
themeService.setTheme('ocean' as any);

// Or add it to ThemeService by extending it`;

  corporateCode = `[data-theme="corporate"] {
  --ton-background: #f8fafc;
  --ton-foreground: #0f172a;
  --ton-primary: #1e40af;
  --ton-primary-foreground: #ffffff;
  --ton-secondary: #e2e8f0;
  --ton-secondary-foreground: #1e293b;
  --ton-muted: #f1f5f9;
  --ton-muted-foreground: #64748b;
  --ton-accent: #dbeafe;
  --ton-accent-foreground: #1e3a8a;
  --ton-destructive: #dc2626;
  --ton-destructive-foreground: #ffffff;
  --ton-card: #ffffff;
  --ton-card-foreground: #0f172a;
  --ton-border: #cbd5e1;
  --ton-input: #cbd5e1;
  --ton-ring: #3b82f6;
  --ton-radius: 0.375rem;
}`;

  tokensCode = `--ton-background       /* Page background */
--ton-foreground       /* Default text color */
--ton-primary          /* Primary actions, links */
--ton-primary-foreground
--ton-secondary        /* Secondary buttons, badges */
--ton-secondary-foreground
--ton-muted            /* Muted backgrounds */
--ton-muted-foreground /* Muted text */
--ton-accent           /* Hover backgrounds */
--ton-accent-foreground
--ton-destructive      /* Error, danger states */
--ton-destructive-foreground
--ton-card             /* Card background */
--ton-card-foreground  /* Card text */
--ton-border           /* Border color */
--ton-input            /* Input border color */
--ton-ring             /* Focus ring color */
--ton-radius           /* Border radius */`;
}
