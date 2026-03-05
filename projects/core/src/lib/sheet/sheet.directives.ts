import { Directive, computed, input, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { cn } from '../core/utils/cn';

@Directive({
  selector: '[tonSheetHeader]',
  host: { '[class]': 'computedClass()' },
})
export class TonSheetHeaderDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-col space-y-2', this.class())
  );
}

@Directive({
  selector: '[tonSheetTitle]',
  host: { '[class]': 'computedClass()' },
})
export class TonSheetTitleDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-lg font-semibold text-foreground', this.class())
  );
}

@Directive({
  selector: '[tonSheetDescription]',
  host: { '[class]': 'computedClass()' },
})
export class TonSheetDescriptionDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('text-sm text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[tonSheetContent]',
  host: { '[class]': 'computedClass()' },
})
export class TonSheetContentDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('py-4', this.class())
  );
}

@Directive({
  selector: '[tonSheetClose]',
  host: {
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
})
export class TonSheetCloseDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      this.class()
    )
  );

  private readonly dialogRef = inject(DialogRef, { optional: true });

  onClick(): void {
    this.dialogRef?.close();
  }
}
