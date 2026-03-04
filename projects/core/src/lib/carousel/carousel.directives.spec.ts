import { Component, viewChild } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonCarouselDirective, TonCarouselContentDirective, TonCarouselItemDirective } from './carousel.directives';

@Component({
  standalone: true,
  imports: [TonCarouselDirective, TonCarouselContentDirective, TonCarouselItemDirective],
  template: `
    <div tonCarousel [loop]="true">
      <div tonCarouselContent>
        <div tonCarouselItem>Slide 1</div>
        <div tonCarouselItem>Slide 2</div>
        <div tonCarouselItem>Slide 3</div>
      </div>
    </div>
  `,
})
class TestHostComponent {
  carousel = viewChild(TonCarouselDirective);
}

describe('TonCarouselDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should render with region role', () => {
    const el = fixture.nativeElement.querySelector('[tonCarousel]');
    expect(el.getAttribute('role')).toBe('region');
    expect(el.getAttribute('aria-roledescription')).toBe('carousel');
  });

  it('should render slides with group role', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonCarouselItem]');
    expect(items.length).toBe(3);
    expect(items[0].getAttribute('role')).toBe('group');
  });

  it('should detect items via contentChildren', () => {
    const c = fixture.componentInstance.carousel()!;
    expect(c.totalItems()).toBe(3);
  });

  it('should navigate to next', () => {
    const c = fixture.componentInstance.carousel()!;
    expect(c.currentIndex()).toBe(0);
    c.next();
    expect(c.currentIndex()).toBe(1);
  });

  it('should loop around', () => {
    const c = fixture.componentInstance.carousel()!;
    c.goTo(2);
    c.next();
    expect(c.currentIndex()).toBe(0);
  });

  it('should navigate prev with loop', () => {
    const c = fixture.componentInstance.carousel()!;
    c.prev();
    expect(c.currentIndex()).toBe(2);
  });

  it('should navigate next on ArrowRight keydown', () => {
    const c = fixture.componentInstance.carousel()!;
    const host = fixture.nativeElement.querySelector('[tonCarousel]');
    expect(c.currentIndex()).toBe(0);
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(c.currentIndex()).toBe(1);
  });

  it('should navigate prev on ArrowLeft keydown', () => {
    const c = fixture.componentInstance.carousel()!;
    const host = fixture.nativeElement.querySelector('[tonCarousel]');
    c.goTo(1);
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(c.currentIndex()).toBe(0);
  });
});
