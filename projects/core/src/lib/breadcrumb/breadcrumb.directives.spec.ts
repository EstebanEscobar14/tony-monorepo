import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  TonBreadcrumbDirective,
  TonBreadcrumbListDirective,
  TonBreadcrumbItemDirective,
  TonBreadcrumbLinkDirective,
  TonBreadcrumbSeparatorDirective,
  TonBreadcrumbPageDirective,
} from './breadcrumb.directives';

@Component({
  standalone: true,
  imports: [
    TonBreadcrumbDirective,
    TonBreadcrumbListDirective,
    TonBreadcrumbItemDirective,
    TonBreadcrumbLinkDirective,
    TonBreadcrumbSeparatorDirective,
    TonBreadcrumbPageDirective,
  ],
  template: `
    <nav tonBreadcrumb>
      <ol tonBreadcrumbList>
        <li tonBreadcrumbItem>
          <a tonBreadcrumbLink href="/">Home</a>
        </li>
        <li tonBreadcrumbSeparator>/</li>
        <li tonBreadcrumbItem>
          <span tonBreadcrumbPage>Current</span>
        </li>
      </ol>
    </nav>
  `,
})
class TestHostComponent {}

describe('Breadcrumb Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should set aria-label on nav', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should apply list classes', () => {
    const ol = fixture.nativeElement.querySelector('ol');
    expect(ol.className).toContain('flex');
    expect(ol.className).toContain('items-center');
  });

  it('should apply link hover classes', () => {
    const link = fixture.nativeElement.querySelector('[tonBreadcrumbLink]');
    expect(link.className).toContain('hover:text-foreground');
  });

  it('should set aria-current="page" on page', () => {
    const page = fixture.nativeElement.querySelector('[tonBreadcrumbPage]');
    expect(page.getAttribute('aria-current')).toBe('page');
  });

  it('should set aria-hidden on separator', () => {
    const sep = fixture.nativeElement.querySelector('[tonBreadcrumbSeparator]');
    expect(sep.getAttribute('aria-hidden')).toBe('true');
  });

  it('should set role="presentation" on separator', () => {
    const sep = fixture.nativeElement.querySelector('[tonBreadcrumbSeparator]');
    expect(sep.getAttribute('role')).toBe('presentation');
  });
});
