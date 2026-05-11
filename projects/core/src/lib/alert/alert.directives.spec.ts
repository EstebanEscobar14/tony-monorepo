import { Component, signal, viewChild } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonAlertDirective, TonAlertTitleDirective, TonAlertDescriptionDirective } from './alert.directives';
import type { AlertVariant } from './alert.variants';

@Component({
  standalone: true,
  imports: [TonAlertDirective, TonAlertTitleDirective, TonAlertDescriptionDirective],
  template: `
    <div tonAlert [variant]="variant()" [dismissible]="dismissible()">
      <h5 tonAlertTitle>{{ title() }}</h5>
      <p tonAlertDescription>{{ description() }}</p>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<AlertVariant>('default');
  dismissible = signal(false);
  title = signal('Test Title');
  description = signal('Test Description');
  alert = viewChild(TonAlertDirective);
}

describe('TonAlertDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[tonAlert]');
  });

  it('should apply default variant classes', () => {
    expect(el.className).toContain('bg-background');
    expect(el.className).toContain('rounded-lg');
  });

  it('should apply destructive variant classes', () => {
    fixture.componentInstance.variant.set('destructive');
    fixture.detectChanges();
    expect(el.className).toContain('text-destructive');
  });

  it('should apply success variant classes', () => {
    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    expect(el.className).toContain('text-green-700');
  });

  it('should apply warning variant classes', () => {
    fixture.componentInstance.variant.set('warning');
    fixture.detectChanges();
    expect(el.className).toContain('text-yellow-700');
  });

  it('should apply info variant classes', () => {
    fixture.componentInstance.variant.set('info');
    fixture.detectChanges();
    expect(el.className).toContain('text-blue-700');
  });

  it('should set role="status" for default and success', () => {
    expect(el.getAttribute('role')).toBe('status');
    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('role')).toBe('status');
  });

  it('should set role="alert" for destructive, warning, info', () => {
    fixture.componentInstance.variant.set('destructive');
    fixture.detectChanges();
    expect(el.getAttribute('role')).toBe('alert');

    fixture.componentInstance.variant.set('warning');
    fixture.detectChanges();
    expect(el.getAttribute('role')).toBe('alert');

    fixture.componentInstance.variant.set('info');
    fixture.detectChanges();
    expect(el.getAttribute('role')).toBe('alert');
  });

  it('should set aria-live="assertive" for destructive/warning', () => {
    fixture.componentInstance.variant.set('destructive');
    fixture.detectChanges();
    expect(el.getAttribute('aria-live')).toBe('assertive');

    fixture.componentInstance.variant.set('warning');
    fixture.detectChanges();
    expect(el.getAttribute('aria-live')).toBe('assertive');
  });

  it('should set aria-live="polite" for default/success/info', () => {
    expect(el.getAttribute('aria-live')).toBe('polite');

    fixture.componentInstance.variant.set('success');
    fixture.detectChanges();
    expect(el.getAttribute('aria-live')).toBe('polite');

    fixture.componentInstance.variant.set('info');
    fixture.detectChanges();
    expect(el.getAttribute('aria-live')).toBe('polite');
  });

  it('should be visible by default', () => {
    expect(el.style.display).not.toBe('none');
  });

  it('should hide when dismiss() is called', () => {
    const alert = fixture.componentInstance.alert();
    alert!.dismiss();
    fixture.detectChanges();
    expect(el.style.display).toBe('none');
  });
});

describe('TonAlertTitleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply title classes', () => {
    const title = fixture.nativeElement.querySelector('[tonAlertTitle]');
    expect(title.className).toContain('font-medium');
    expect(title.className).toContain('tracking-tight');
  });
});

describe('TonAlertDescriptionDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply description classes', () => {
    const desc = fixture.nativeElement.querySelector('[tonAlertDescription]');
    expect(desc.className).toContain('text-sm');
  });
});
