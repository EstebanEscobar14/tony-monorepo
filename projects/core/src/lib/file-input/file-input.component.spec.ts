import { Component, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonFileInputComponent } from './file-input.component';
import type { FileInputVariant, FileInputSize } from './file-input.variants';

@Component({
  standalone: true,
  imports: [TonFileInputComponent],
  template: `
    <ton-file-input
      [variant]="variant()"
      [size]="size()"
      [disabled]="disabled()"
      [placeholder]="placeholder()"
      [maxSize]="maxSize()"
      (error)="lastError = $event"
    />
  `,
})
class TestHostComponent {
  variant = signal<FileInputVariant>('default');
  size = signal<FileInputSize>('md');
  disabled = signal(false);
  placeholder = signal('Choose file...');
  maxSize = signal(0);
  lastError = '';
  fileInput = viewChild(TonFileInputComponent);
}

describe('TonFileInputComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('ton-file-input');
  });

  it('should show placeholder text', () => {
    expect(host.textContent).toContain('Choose file...');
  });

  it('should apply default variant classes', () => {
    const label = host.querySelector('label');
    expect(label!.className).toContain('border-input');
  });

  it('should apply error variant classes', () => {
    fixture.componentInstance.variant.set('error');
    fixture.detectChanges();
    const label = host.querySelector('label');
    expect(label!.className).toContain('border-destructive');
  });

  it('should have file input with sr-only class', () => {
    const input = host.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className).toContain('sr-only');
  });

  it('should disable the input', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const input = host.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should clear the selection', () => {
    const comp = fixture.componentInstance.fileInput();
    comp!.clear();
    fixture.detectChanges();
    expect(host.textContent).toContain('Choose file...');
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, TonFileInputComponent],
  template: `<ton-file-input [formControl]="ctrl" />`,
})
class ReactiveFormHost {
  ctrl = new FormControl<FileList | null>(null);
}

describe('TonFileInputComponent — Reactive Forms', () => {
  let fixture: ComponentFixture<ReactiveFormHost>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormHost],
    }).compileComponents();
    fixture = TestBed.createComponent(ReactiveFormHost);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('ton-file-input');
  });

  it('should render with FormControl (writeValue)', () => {
    expect(host).toBeTruthy();
    expect(host.textContent).toContain('Choose file...');
  });

  it('should disable via FormControl.disable() (setDisabledState)', () => {
    fixture.componentInstance.ctrl.disable();
    fixture.detectChanges();
    const input = host.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
