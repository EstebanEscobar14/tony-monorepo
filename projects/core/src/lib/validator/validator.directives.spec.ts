import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonValidatorDirective, TonValidatorHintDirective } from './validator.directives';

@Component({
  standalone: true,
  imports: [TonValidatorDirective, TonValidatorHintDirective],
  template: `
    <div tonValidator>
      <div tonValidatorHint when="required" variant="error">Required</div>
      <div tonValidatorHint when="minlength" variant="error">Too short</div>
      <div tonValidatorHint variant="success">Looks good!</div>
    </div>
  `,
})
class TestHostComponent {}

describe('TonValidatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render validator container', () => {
    const el = fixture.nativeElement.querySelector('[tonValidator]');
    expect(el).toBeTruthy();
  });

  it('should render hints with alert role', () => {
    const hints = fixture.nativeElement.querySelectorAll('[tonValidatorHint]');
    expect(hints.length).toBe(3);
    hints.forEach((h: HTMLElement) => expect(h.getAttribute('role')).toBe('alert'));
  });

  it('should apply error variant to error hints', () => {
    const hints = fixture.nativeElement.querySelectorAll('[tonValidatorHint]');
    expect(hints[0].className).toContain('text-destructive');
  });

  it('should apply success variant', () => {
    const hints = fixture.nativeElement.querySelectorAll('[tonValidatorHint]');
    expect(hints[2].className).toContain('text-green-600');
  });
});
