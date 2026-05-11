import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonNavbarDirective, TonNavbarBrandDirective, TonNavbarContentDirective, TonNavbarEndDirective, type NavbarVariant } from './navbar.directives';

@Component({
  standalone: true,
  imports: [TonNavbarDirective, TonNavbarBrandDirective, TonNavbarContentDirective, TonNavbarEndDirective],
  template: `
    <nav tonNavbar [variant]="variant()" [sticky]="sticky()">
      <div tonNavbarBrand>Logo</div>
      <div tonNavbarContent>Links</div>
      <div tonNavbarEnd>Actions</div>
    </nav>
  `,
})
class TestHostComponent {
  variant = signal<NavbarVariant>('default');
  sticky = signal(false);
}

describe('TonNavbarDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let nav: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    nav = fixture.nativeElement.querySelector('[tonNavbar]');
  });

  it('should apply default classes', () => {
    expect(nav.className).toContain('bg-background');
    expect(nav.className).toContain('flex');
  });

  it('should apply bordered variant', () => {
    fixture.componentInstance.variant.set('bordered');
    fixture.detectChanges();
    expect(nav.className).toContain('border-b');
  });

  it('should apply sticky class', () => {
    fixture.componentInstance.sticky.set(true);
    fixture.detectChanges();
    expect(nav.className).toContain('sticky');
    expect(nav.className).toContain('top-0');
  });

  it('should render brand, content, end sections', () => {
    expect(fixture.nativeElement.querySelector('[tonNavbarBrand]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[tonNavbarContent]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[tonNavbarEnd]')).toBeTruthy();
  });

  it('should have default aria-label "Main navigation"', () => {
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });
});
