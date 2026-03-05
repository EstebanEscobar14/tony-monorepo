import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { linkVariants, type LinkVariant } from './link.variants';

@Directive({
  selector: 'a[tonLink]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class TonLinkDirective {
  readonly variant = input<LinkVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(linkVariants({ variant: this.variant() }), this.class())
  );
}
