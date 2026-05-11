import { Directive, ElementRef, InjectionToken, computed, inject, input, signal } from '@angular/core';
import { cn } from '../core/utils/cn';
import {
  dropdownContentVariants,
  dropdownItemVariants,
  type DropdownItemVariant,
} from './dropdown.variants';

export const SNY_DROPDOWN = new InjectionToken<TonDropdownDirective>('TonDropdown');

@Directive({
  selector: '[tonDropdown]',
  exportAs: 'tonDropdown',
  providers: [{ provide: SNY_DROPDOWN, useExisting: TonDropdownDirective }],
  host: {
    '[class]': '"relative inline-block"',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'onEscape()',
  },
})
export class TonDropdownDirective {
  private readonly elementRef = inject(ElementRef);
  readonly isOpen = signal(false);

  toggle(): void { this.isOpen.update((v) => !v); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  onEscape(): void {
    this.close();
  }
}

@Directive({
  selector: '[tonDropdownTrigger]',
  host: {
    '(click)': 'dropdown.toggle()',
    '[attr.aria-expanded]': 'dropdown.isOpen()',
    '[attr.aria-haspopup]': '"menu"',
  },
})
export class TonDropdownTriggerDirective {
  readonly dropdown = inject(SNY_DROPDOWN);
}

@Directive({
  selector: '[tonDropdownContent]',
  host: {
    'role': 'menu',
    '[class]': 'computedClass()',
    '[style.display]': 'dropdown.isOpen() ? "" : "none"',
  },
})
export class TonDropdownContentDirective {
  readonly dropdown = inject(SNY_DROPDOWN);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(
      dropdownContentVariants(),
      'absolute mt-1 left-0 animate-in fade-in-0 zoom-in-95',
      this.class()
    )
  );
}

@Directive({
  selector: '[tonMenuContent]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class TonMenuContentDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(dropdownContentVariants(), this.class())
  );
}

@Directive({
  selector: '[tonMenuItem]',
  host: {
    'role': 'menuitem',
    '[class]': 'computedClass()',
    '(click)': 'onClick()',
  },
})
export class TonMenuItemDirective {
  private readonly dropdown = inject(SNY_DROPDOWN, { optional: true });
  readonly variant = input<DropdownItemVariant>('default');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(dropdownItemVariants({ variant: this.variant() }), 'cursor-pointer hover:bg-accent hover:text-accent-foreground', this.class())
  );

  onClick(): void {
    this.dropdown?.close();
  }
}

@Directive({
  selector: '[tonMenuSeparator]',
  host: {
    'role': 'separator',
    '[class]': 'computedClass()',
  },
})
export class TonMenuSeparatorDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('-mx-1 my-1 h-px bg-muted', this.class())
  );
}

@Directive({
  selector: '[tonMenuLabel]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class TonMenuLabelDirective {
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('px-2 py-1.5 text-sm font-semibold', this.class())
  );
}
