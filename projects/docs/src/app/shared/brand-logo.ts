import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ThemeService } from '@tony-ui/core';

@Component({
  selector: 'docs-brand-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="brand-logo" [style.width.px]="size()">
      <img
        [src]="src()"
        [alt]="label()"
        class="brand-logo__image"
        decoding="async"
        loading="eager"
      />
    </span>
  `,
  styles: [
    `
      .brand-logo {
        display: inline-flex;
        align-items: center;
        line-height: 0;
      }

      .brand-logo__image {
        display: block;
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class BrandLogoComponent {
  private readonly themeService = inject(ThemeService);

  readonly size = input(64);
  readonly label = input('TonyUI logo');
  readonly src = computed(() => this.themeService.theme() === 'dark' ? 'logo-dark.png' : 'logo-light.png');
}
