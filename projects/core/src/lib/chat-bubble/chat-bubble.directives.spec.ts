import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonChatBubbleDirective, TonChatBubbleContentDirective, type ChatBubbleAlign, type ChatBubbleContentVariant } from './chat-bubble.directives';

@Component({
  standalone: true,
  imports: [TonChatBubbleDirective, TonChatBubbleContentDirective],
  template: `
    <div tonChatBubble [align]="align()">
      <div tonChatBubbleContent [variant]="variant()">Hello!</div>
    </div>
  `,
})
class TestHostComponent {
  align = signal<ChatBubbleAlign>('start');
  variant = signal<ChatBubbleContentVariant>('default');
}

describe('TonChatBubbleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with article role', () => {
    const bubble = fixture.nativeElement.querySelector('[tonChatBubble]');
    expect(bubble.getAttribute('role')).toBe('article');
  });

  it('should apply start alignment by default', () => {
    const bubble = fixture.nativeElement.querySelector('[tonChatBubble]');
    expect(bubble.className).toContain('flex');
    expect(bubble.className).not.toContain('flex-row-reverse');
  });

  it('should apply end alignment', () => {
    fixture.componentInstance.align.set('end');
    fixture.detectChanges();
    const bubble = fixture.nativeElement.querySelector('[tonChatBubble]');
    expect(bubble.className).toContain('flex-row-reverse');
  });

  it('should apply primary content variant', () => {
    fixture.componentInstance.variant.set('primary');
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('[tonChatBubbleContent]');
    expect(content.className).toContain('bg-primary');
  });
});
