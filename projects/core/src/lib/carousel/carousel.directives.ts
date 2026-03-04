import {
  Directive, InjectionToken, computed, contentChildren, inject, input, signal, effect, OnDestroy,
} from '@angular/core';
import { cn } from '../core/utils/cn';

export const SNY_CAROUSEL = new InjectionToken<TonCarouselDirective>('TonCarousel');

@Directive({
  selector: '[tonCarouselItem]',
  host: {
    'role': 'group',
    '[attr.aria-roledescription]': '"slide"',
    '[class]': 'computedClass()',
  },
})
export class TonCarouselItemDirective {
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('min-w-0 shrink-0 grow-0 basis-full pl-4', this.class())
  );
}

@Directive({
  selector: '[tonCarouselContent]',
  host: {
    '[class]': 'computedClass()',
    '[style.transform]': 'transformStyle()',
  },
})
export class TonCarouselContentDirective {
  private readonly carousel = inject(SNY_CAROUSEL);
  readonly class = input<string>('');

  protected readonly computedClass = computed(() =>
    cn('flex -ml-4 transition-transform duration-300 ease-in-out', this.class())
  );

  protected readonly transformStyle = computed(() =>
    `translateX(-${this.carousel.currentIndex() * 100}%)`
  );
}

@Directive({
  selector: '[tonCarousel]',
  exportAs: 'tonCarousel',
  providers: [{ provide: SNY_CAROUSEL, useExisting: TonCarouselDirective }],
  host: {
    'role': 'region',
    '[attr.aria-roledescription]': '"carousel"',
    'aria-label': 'Carousel',
    'tabindex': '0',
    '[class]': 'computedClass()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class TonCarouselDirective implements OnDestroy {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly loop = input(false);
  readonly autoplay = input(0);
  readonly class = input<string>('');

  readonly items = contentChildren(TonCarouselItemDirective, { descendants: true });
  readonly currentIndex = signal(0);
  readonly totalItems = computed(() => this.items().length);

  private autoplayInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const ms = this.autoplay();
      this.clearAutoplay();
      if (ms > 0) {
        this.autoplayInterval = setInterval(() => this.next(), ms);
      }
    });
  }

  next(): void {
    const total = this.totalItems();
    if (total === 0) return;
    this.currentIndex.update((i) => {
      if (i >= total - 1) return this.loop() ? 0 : i;
      return i + 1;
    });
  }

  prev(): void {
    const total = this.totalItems();
    if (total === 0) return;
    this.currentIndex.update((i) => {
      if (i <= 0) return this.loop() ? total - 1 : i;
      return i - 1;
    });
  }

  goTo(index: number): void {
    this.currentIndex.set(Math.max(0, Math.min(index, this.totalItems() - 1)));
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.prev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
    }
  }

  ngOnDestroy(): void {
    this.clearAutoplay();
  }

  private clearAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  protected readonly computedClass = computed(() =>
    cn('relative overflow-hidden', this.class())
  );
}

@Directive({
  selector: '[tonCarouselPrev]',
  host: {
    '(click)': 'carousel.prev()',
    '[attr.aria-label]': '"Previous slide"',
    '[class]': 'computedClass()',
  },
})
export class TonCarouselPrevDirective {
  readonly carousel = inject(SNY_CAROUSEL);
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('absolute left-2 top-1/2 -translate-y-1/2 z-10', this.class())
  );
}

@Directive({
  selector: '[tonCarouselNext]',
  host: {
    '(click)': 'carousel.next()',
    '[attr.aria-label]': '"Next slide"',
    '[class]': 'computedClass()',
  },
})
export class TonCarouselNextDirective {
  readonly carousel = inject(SNY_CAROUSEL);
  readonly class = input<string>('');
  protected readonly computedClass = computed(() =>
    cn('absolute right-2 top-1/2 -translate-y-1/2 z-10', this.class())
  );
}
