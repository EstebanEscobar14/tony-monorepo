import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[tonCell]',
})
export class TonCellDefDirective {
  readonly tonCell = input.required<string>();
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[tonHeaderCell]',
})
export class TonHeaderCellDefDirective {
  readonly tonHeaderCell = input.required<string>();
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[tonBulkActions]',
})
export class TonBulkActionsDefDirective {
  readonly template = inject(TemplateRef);
}

@Directive({
  selector: '[tonRowExpand]',
})
export class TonRowExpandDefDirective {
  readonly template = inject(TemplateRef);
}
