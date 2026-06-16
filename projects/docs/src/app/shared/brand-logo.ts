import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ThemeService } from '@tony-ui/core';

@Component({
  selector: 'docs-brand-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="brand-logo"
      [class.brand-logo--dark]="themeService.theme() === 'dark'"
      [class.brand-logo--corporate]="themeService.theme() === 'corporate'"
      [style.fontSize.px]="fontSize()"
      [attr.aria-label]="label()"
      role="img"
    >
      <span class="brand-logo__mark">CF</span>
      <span class="brand-logo__wordmark">Capital Flow</span>
    </span>
  `,
  styles: [
    `
      .brand-logo {
        display: inline-flex;
        align-items: center;
        gap: 0.7em;
        color: var(--ton-foreground);
        font-weight: 700;
        letter-spacing: -0.03em;
      }

      .brand-logo__mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.2em;
        height: 2.2em;
        padding: 0 0.55em;
        border-radius: 0.8em;
        background: color-mix(in srgb, var(--ton-foreground) 88%, var(--ton-background) 12%);
        color: var(--ton-background);
        font-size: 0.72em;
        font-weight: 800;
        letter-spacing: 0.06em;
      }

      .brand-logo__wordmark {
        display: inline-block;
        white-space: nowrap;
        font-size: 1em;
        line-height: 1;
      }

      .brand-logo--dark .brand-logo__mark {
        background: color-mix(in srgb, white 90%, var(--ton-primary) 10%);
        color: #111111;
      }

      .brand-logo--corporate .brand-logo__mark {
        background: linear-gradient(135deg, color-mix(in srgb, var(--ton-primary) 82%, white 18%), var(--ton-primary));
        color: white;
      }
    `,
  ],
})
export class BrandLogoComponent {
  readonly themeService = inject(ThemeService);

  readonly size = input(64);
  readonly label = input('Capital Flow logo');
  readonly fontSize = computed(() => Math.max(this.size() * 0.28, 12));
}
