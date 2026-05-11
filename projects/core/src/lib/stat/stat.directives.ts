import { Directive, InjectionToken, computed, inject, input } from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_STAT = new InjectionToken<TonStatDirective>('TonStat');

let statIdCounter = 0;

@Directive({
  selector: '[tonStat]',
  providers: [{ provide: SNY_STAT, useExisting: TonStatDirective }],
  host: { '[class]': 'computedClass()' },
})
export class TonStatDirective {
  readonly class = input<string>('');
  readonly titleId = `ton-stat-title-${++statIdCounter}`;
  protected readonly computedClass = computed(() =>
    cn('flex flex-col gap-0.5', this.class())
  );
}

@Directive({
  selector: '[tonStatTitle]',
  host: {
    '[class]': 'computedClass()',
    '[id]': 'stat.titleId',
  },
})
export class TonStatTitleDirective {
  readonly class = input<string>('');
  readonly stat = inject(SNY_STAT);
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[tonStatValue]',
  host: {
    '[class]': 'computedClass()',
    '[attr.aria-labelledby]': 'stat.titleId',
  },
})
export class TonStatValueDirective {
  readonly class = input<string>('');
  readonly stat = inject(SNY_STAT);
  protected readonly computedClass = computed(() =>
    cn('text-2xl font-bold', this.class())
  );
}

export type StatDescriptionVariant = 'default' | 'success' | 'error';

@Directive({
  selector: '[tonStatDescription]',
  host: { '[class]': 'computedClass()' },
})
export class TonStatDescriptionDirective {
  readonly variant = input<StatDescriptionVariant>('default');
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => {
    const v = this.variant();
    const variantClass =
      v === 'success' ? 'text-green-600 dark:text-green-400' :
      v === 'error' ? 'text-destructive' :
      'text-muted-foreground';
    return cn('text-xs', variantClass, this.class());
  });
}

@Directive({
  selector: '[tonStatFigure]',
  host: { '[class]': 'computedClass()' },
})
export class TonStatFigureDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-muted-foreground', this.class())
  );
}
