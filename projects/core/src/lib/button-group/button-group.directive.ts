import { Directive, computed, input } from '@angular/core';
import { cn } from '../core/utils/cn';
import { buttonGroupVariants, type ButtonGroupOrientation } from './button-group.variants';

@Directive({
  selector: '[tonButtonGroup]',
  host: {
    role: 'group',
    '[class]': 'computedClass()',
  },
})
export class TonButtonGroupDirective {
  readonly orientation = input<ButtonGroupOrientation>('horizontal');
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn(buttonGroupVariants({ orientation: this.orientation() }), this.class())
  );
}
