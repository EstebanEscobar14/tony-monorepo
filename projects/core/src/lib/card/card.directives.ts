import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { cardVariants, type CardVariant, type CardPadding } from './card.variants';

@Directive({
  selector: '[tonCard]',
  host: { '[class]': 'computedClass()' },
})
export class TonCardDirective {
  readonly variant = input<CardVariant>('default');
  readonly padding = input<CardPadding>('none');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(cardVariants({ variant: this.variant(), padding: this.padding() }), this.class())
  );
}

@Directive({
  selector: '[tonCardHeader]',
  host: { '[class]': 'computedClass()' },
})
export class TonCardHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-1.5 p-6', this.class())
  );
}

@Directive({
  selector: '[tonCardTitle]',
  host: { '[class]': 'computedClass()' },
})
export class TonCardTitleDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-2xl font-semibold leading-none tracking-tight', this.class())
  );
}

@Directive({
  selector: '[tonCardDescription]',
  host: { '[class]': 'computedClass()' },
})
export class TonCardDescriptionDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[tonCardContent]',
  host: { '[class]': 'computedClass()' },
})
export class TonCardContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('p-6 pt-0', this.class())
  );
}

@Directive({
  selector: '[tonCardFooter]',
  host: { '[class]': 'computedClass()' },
})
export class TonCardFooterDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex items-center p-6 pt-0', this.class())
  );
}
