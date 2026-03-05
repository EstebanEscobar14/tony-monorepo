import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonStepsDirective, TonStepDirective, type StepStatus } from './steps.directives';

@Component({
  standalone: true,
  imports: [TonStepsDirective, TonStepDirective],
  template: `
    <div tonSteps>
      <div tonStep status="completed">Register</div>
      <div tonStep [status]="activeStatus()">Payment</div>
      <div tonStep status="default">Confirm</div>
    </div>
  `,
})
class TestHostComponent {
  activeStatus = signal<StepStatus>('active');
}

describe('TonStepsDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with list role', () => {
    const steps = fixture.nativeElement.querySelector('[tonSteps]');
    expect(steps.getAttribute('role')).toBe('list');
  });

  it('should render steps with listitem role', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonStep]');
    expect(items.length).toBe(3);
    items.forEach((item: HTMLElement) => {
      expect(item.getAttribute('role')).toBe('listitem');
    });
  });

  it('should mark active step with aria-current', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonStep]');
    expect(items[1].getAttribute('aria-current')).toBe('step');
    expect(items[0].getAttribute('aria-current')).toBeNull();
  });

  it('should apply completed styling', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonStep]');
    expect(items[0].className).toContain('text-primary');
  });
});
