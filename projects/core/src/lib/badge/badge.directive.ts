import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { badgeVariants, type BadgeVariant, type BadgeSize } from './badge.variants';

@Directive({
  selector: '[tonBadge]',
  host: { '[class]': 'computedClass()' },
})
export class TonBadgeDirective {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<BadgeSize>('md');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(badgeVariants({ variant: this.variant(), size: this.size() }), this.class())
  );
}
