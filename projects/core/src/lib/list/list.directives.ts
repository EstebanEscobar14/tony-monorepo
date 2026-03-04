import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export type ListVariant = 'default' | 'bordered' | 'hover';

@Directive({
  selector: '[tonList]',
  host: {
    'role': 'list',
    '[class]': 'computedClass()',
  },
})
export class TonListDirective {
  readonly variant = input<ListVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() => {
    const v = this.variant();
    const variantClass =
      v === 'bordered' ? 'divide-y divide-border border rounded-md' :
      v === 'hover' ? '[&>[tonListItem]]:hover:bg-accent' :
      '';
    return cn('flex flex-col', variantClass, this.class());
  });
}

@Directive({
  selector: '[tonListItem]',
  host: {
    'role': 'listitem',
    '[class]': 'computedClass()',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class TonListItemDirective {
  readonly active = input(false);
  readonly disabled = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      'flex items-center gap-3 px-3 py-2 transition-colors',
      this.active() && 'bg-accent text-accent-foreground',
      this.disabled() && 'opacity-50 pointer-events-none',
      this.class()
    )
  );
}

@Directive({
  selector: '[tonListItemIcon]',
  host: { '[class]': 'computedClass()' },
})
export class TonListItemIconDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-shrink-0 text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[tonListItemContent]',
  host: { '[class]': 'computedClass()' },
})
export class TonListItemContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-1 min-w-0', this.class())
  );
}

@Directive({
  selector: '[tonListItemAction]',
  host: { '[class]': 'computedClass()' },
})
export class TonListItemActionDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex-shrink-0', this.class())
  );
}
