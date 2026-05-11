import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
  TonCardDescriptionDirective,
  TonCardContentDirective,
  TonCardFooterDirective,
} from './card.directives';
import type { CardVariant, CardPadding } from './card.variants';

@Component({
  standalone: true,
  imports: [
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
    TonCardDescriptionDirective,
    TonCardContentDirective,
    TonCardFooterDirective,
  ],
  template: `
    <div tonCard [variant]="variant()" [padding]="padding()">
      <div tonCardHeader>
        <h3 tonCardTitle>Title</h3>
        <p tonCardDescription>Description</p>
      </div>
      <div tonCardContent>Content</div>
      <div tonCardFooter>Footer</div>
    </div>
  `,
})
class TestHostComponent {
  variant = signal<CardVariant>('default');
  padding = signal<CardPadding>('none');
}

describe('Card Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply default card classes', () => {
    const card = fixture.nativeElement.querySelector('[tonCard]');
    expect(card.className).toContain('bg-card');
    expect(card.className).toContain('border');
  });

  it('should apply elevated variant', () => {
    fixture.componentInstance.variant.set('elevated');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('[tonCard]');
    expect(card.className).toContain('shadow-lg');
  });

  it('should apply ghost variant', () => {
    fixture.componentInstance.variant.set('ghost');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('[tonCard]');
    expect(card.className).toContain('bg-transparent');
  });

  it('should apply padding', () => {
    fixture.componentInstance.padding.set('md');
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('[tonCard]');
    expect(card.className).toContain('p-6');
  });

  it('should render card header', () => {
    const header = fixture.nativeElement.querySelector('[tonCardHeader]');
    expect(header.className).toContain('flex');
    expect(header.className).toContain('p-6');
  });

  it('should render card title', () => {
    const title = fixture.nativeElement.querySelector('[tonCardTitle]');
    expect(title.className).toContain('text-2xl');
    expect(title.className).toContain('font-semibold');
  });

  it('should render card description', () => {
    const desc = fixture.nativeElement.querySelector('[tonCardDescription]');
    expect(desc.className).toContain('text-muted-foreground');
  });

  it('should render content projection', () => {
    const content = fixture.nativeElement.querySelector('[tonCardContent]');
    expect(content.textContent).toContain('Content');
  });

  it('should render card footer', () => {
    const footer = fixture.nativeElement.querySelector('[tonCardFooter]');
    expect(footer.className).toContain('flex');
    expect(footer.className).toContain('items-center');
  });
});
