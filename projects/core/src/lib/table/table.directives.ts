import { Directive, computed, inject, input, InjectionToken } from '@angular/core';
import { cn } from '../core/utils/cn';
import { tableVariants, tableCellVariants, type TableVariant, type TableDensity } from './table.variants';

export const SNY_TABLE = new InjectionToken<TonTableDirective>('TonTable');

@Directive({
  selector: 'table[tonTable]',
  providers: [{ provide: SNY_TABLE, useExisting: TonTableDirective }],
  host: { '[class]': 'computedClass()' },
})
export class TonTableDirective {
  readonly variant = input<TableVariant>('default');
  readonly density = input<TableDensity>('normal');
  readonly hoverable = input(false);
  readonly stickyHeader = input(false);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(tableVariants({ variant: this.variant() }), this.class())
  );
}

@Directive({
  selector: 'thead[tonTableHeader]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableHeaderDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      '[&_tr]:border-b',
      this.table?.stickyHeader() ? 'sticky top-0 z-10 bg-background' : '',
      this.class()
    )
  );
}

@Directive({
  selector: 'tbody[tonTableBody]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableBodyDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('[&_tr:last-child]:border-0', this.class())
  );
}

@Directive({
  selector: 'tr[tonTableRow]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableRowDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      'border-b border-border transition-colors data-[state=selected]:bg-muted',
      this.table?.hoverable() ? 'hover:bg-muted/50' : '',
      this.class()
    )
  );
}

@Directive({
  selector: 'th[tonTableHead]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableHeadDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      'text-left font-medium text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right',
      tableCellVariants({ density: this.table?.density() ?? 'normal' }),
      this.class()
    )
  );
}

@Directive({
  selector: 'td[tonTableCell]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableCellDirective {
  readonly class = input<string>('');
  private readonly table = inject(SNY_TABLE, { optional: true });

  protected readonly computedClass = computed(() =>
    cn(
      '[&[align=center]]:text-center [&[align=right]]:text-right',
      tableCellVariants({ density: this.table?.density() ?? 'normal' }),
      this.class()
    )
  );
}

@Directive({
  selector: 'tfoot[tonTableFooter]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableFooterDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('border-t border-border font-medium [&>tr]:last:border-b-0', this.class())
  );
}

@Directive({
  selector: 'caption[tonTableCaption]',
  host: { '[class]': 'computedClass()' },
})
export class TonTableCaptionDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('mt-4 text-sm text-muted-foreground', this.class())
  );
}
