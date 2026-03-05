import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';

@Directive({
  selector: 'nav[tonBreadcrumb]',
  host: {
    '[class]': 'computedClass()',
    'aria-label': 'Breadcrumb',
  },
})
export class TonBreadcrumbDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() => cn('', this.class()));
}

@Directive({
  selector: 'ol[tonBreadcrumbList]',
  host: { '[class]': 'computedClass()' },
})
export class TonBreadcrumbListDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5', this.class())
  );
}

@Directive({
  selector: 'li[tonBreadcrumbItem]',
  host: { '[class]': 'computedClass()' },
})
export class TonBreadcrumbItemDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('inline-flex items-center gap-1.5', this.class())
  );
}

@Directive({
  selector: '[tonBreadcrumbLink]',
  host: { '[class]': 'computedClass()' },
})
export class TonBreadcrumbLinkDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('transition-colors hover:text-foreground', this.class())
  );
}

@Directive({
  selector: '[tonBreadcrumbSeparator]',
  host: {
    role: 'presentation',
    '[aria-hidden]': 'true',
    '[class]': 'computedClass()',
  },
})
export class TonBreadcrumbSeparatorDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('[&>svg]:size-3.5 text-muted-foreground', this.class())
  );
}

@Directive({
  selector: '[tonBreadcrumbPage]',
  host: {
    role: 'link',
    'aria-disabled': 'true',
    '[attr.aria-current]': '"page"',
    '[class]': 'computedClass()',
  },
})
export class TonBreadcrumbPageDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('font-normal text-foreground', this.class())
  );
}
