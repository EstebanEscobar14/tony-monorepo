import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TonRadioDirective } from './radio.directive';
import type { RadioSize } from './radio.variants';

@Component({
  standalone: true,
  imports: [TonRadioDirective],
  template: `<input type="radio" tonRadio [size]="size()" />`,
})
class TestHostComponent {
  size = signal<RadioSize>('md');
}

describe('TonRadioDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('input');
  });

  it('should apply default classes', () => {
    expect(el.className).toContain('appearance-none');
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('h-4');
  });

  it('should apply sm size', () => {
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(el.className).toContain('h-3.5');
  });

  it('should apply lg size', () => {
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el.className).toContain('h-5');
  });
});
