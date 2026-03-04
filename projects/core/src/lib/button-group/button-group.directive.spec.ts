import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TonButtonGroupDirective } from './button-group.directive';
import type { ButtonGroupOrientation } from './button-group.variants';

@Component({
  standalone: true,
  imports: [TonButtonGroupDirective],
  template: `<div tonButtonGroup [orientation]="orientation()"><button>A</button><button>B</button></div>`,
})
class TestHostComponent {
  orientation = signal<ButtonGroupOrientation>('horizontal');
}

describe('TonButtonGroupDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[tonButtonGroup]');
  });

  it('should have role="group"', () => {
    expect(el.getAttribute('role')).toBe('group');
  });

  it('should apply inline-flex', () => {
    expect(el.className).toContain('inline-flex');
  });

  it('should apply horizontal orientation by default', () => {
    expect(el.className).toContain('flex-row');
  });

  it('should apply vertical orientation', () => {
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(el.className).toContain('flex-col');
  });
});
