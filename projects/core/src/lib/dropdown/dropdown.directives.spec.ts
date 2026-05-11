import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  TonMenuContentDirective,
  TonMenuItemDirective,
  TonMenuSeparatorDirective,
  TonMenuLabelDirective,
} from './dropdown.directives';
import type { DropdownItemVariant } from './dropdown.variants';

@Component({
  standalone: true,
  imports: [
    TonMenuContentDirective,
    TonMenuItemDirective,
    TonMenuSeparatorDirective,
    TonMenuLabelDirective,
  ],
  template: `
    <div tonMenuContent>
      <div tonMenuLabel>Actions</div>
      <div tonMenuItem [variant]="variant()">Edit</div>
      <div tonMenuSeparator></div>
      <div tonMenuItem variant="destructive">Delete</div>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<DropdownItemVariant>('default');
}

describe('TonMenuContentDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply content classes', () => {
    const content = fixture.nativeElement.querySelector('[tonMenuContent]');
    expect(content.className).toContain('rounded-md');
    expect(content.className).toContain('bg-popover');
  });
});

describe('TonMenuItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply default item classes', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonMenuItem]');
    expect(items[0].className).toContain('text-sm');
    expect(items[0].className).toContain('rounded-sm');
  });

  it('should apply destructive variant', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonMenuItem]');
    expect(items[1].className).toContain('text-destructive');
  });
});

describe('TonMenuSeparatorDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply separator classes and role', () => {
    const separator = fixture.nativeElement.querySelector('[tonMenuSeparator]');
    expect(separator.getAttribute('role')).toBe('separator');
    expect(separator.className).toContain('bg-muted');
  });
});

describe('TonMenuLabelDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply label classes', () => {
    const label = fixture.nativeElement.querySelector('[tonMenuLabel]');
    expect(label.className).toContain('font-semibold');
  });
});
