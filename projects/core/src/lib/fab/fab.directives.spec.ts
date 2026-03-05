import { Component, viewChild } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonFabDirective, TonFabTriggerDirective, TonFabActionDirective } from './fab.directives';

@Component({
  standalone: true,
  imports: [TonFabDirective, TonFabTriggerDirective, TonFabActionDirective],
  template: `
    <div tonFab>
      <button tonFabAction ariaLabel="Edit item">Action 1</button>
      <button tonFabAction>Action 2</button>
      <button tonFabTrigger>+</button>
    </div>
  `,
})
class TestHostComponent {
  fab = viewChild(TonFabDirective);
}

describe('TonFabDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should be closed by default', () => {
    const actions = fixture.nativeElement.querySelectorAll('[tonFabAction]');
    actions.forEach((a: HTMLElement) => expect(a.className).toContain('scale-0'));
  });

  it('should open on trigger click', () => {
    const trigger = fixture.nativeElement.querySelector('[tonFabTrigger]');
    trigger.click();
    fixture.detectChanges();
    const actions = fixture.nativeElement.querySelectorAll('[tonFabAction]');
    actions.forEach((a: HTMLElement) => expect(a.className).toContain('scale-100'));
  });

  it('should have aria-expanded on trigger', () => {
    const trigger = fixture.nativeElement.querySelector('[tonFabTrigger]');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have menuitem role on actions', () => {
    const actions = fixture.nativeElement.querySelectorAll('[tonFabAction]');
    actions.forEach((a: HTMLElement) => expect(a.getAttribute('role')).toBe('menuitem'));
  });

  it('should set aria-label on action when ariaLabel input is provided', () => {
    const actions = fixture.nativeElement.querySelectorAll('[tonFabAction]');
    expect(actions[0].getAttribute('aria-label')).toBe('Edit item');
    expect(actions[1].getAttribute('aria-label')).toBeNull();
  });
});
