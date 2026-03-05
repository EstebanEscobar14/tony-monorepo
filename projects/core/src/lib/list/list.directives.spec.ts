import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonListDirective, TonListItemDirective, TonListItemContentDirective, type ListVariant } from './list.directives';

@Component({
  standalone: true,
  imports: [TonListDirective, TonListItemDirective, TonListItemContentDirective],
  template: `
    <div tonList [variant]="variant()">
      <div tonListItem [active]="active()" [disabled]="disabled()">
        <div tonListItemContent>Item 1</div>
      </div>
      <div tonListItem>
        <div tonListItemContent>Item 2</div>
      </div>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<ListVariant>('default');
  active = signal(false);
  disabled = signal(false);
}

describe('TonListDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with list role', () => {
    const list = fixture.nativeElement.querySelector('[tonList]');
    expect(list.getAttribute('role')).toBe('list');
  });

  it('should render items with listitem role', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonListItem]');
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('role')).toBe('listitem');
  });

  it('should apply bordered variant', () => {
    fixture.componentInstance.variant.set('bordered');
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('[tonList]');
    expect(list.className).toContain('border');
  });

  it('should apply active state', () => {
    fixture.componentInstance.active.set(true);
    fixture.detectChanges();
    const item = fixture.nativeElement.querySelector('[tonListItem]');
    expect(item.className).toContain('bg-accent');
  });

  it('should set aria-disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    const item = fixture.nativeElement.querySelector('[tonListItem]');
    expect(item.getAttribute('aria-disabled')).toBe('true');
  });
});
