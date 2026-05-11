import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { buttonVariants, type ButtonVariant, type ButtonSize } from './button.variants';

@Directive({
  selector: 'button[tonBtn], a[tonBtn]',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-disabled]': 'disabled() || loading() || null',
    '[attr.disabled]': 'disabled() || loading() || null',
    '[attr.tabindex]': '(disabled() || loading()) ? -1 : null',
  },
})
export class TonButtonDirective {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.loading() && 'cursor-wait opacity-70',
      this.class()
    )
  );
}
