import { Component, signal, viewChild } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  TonAccordionDirective,
  TonAccordionItemDirective,
  TonAccordionTriggerDirective,
  TonAccordionContentDirective,
} from './accordion.directives';

@Component({
  standalone: true,
  imports: [
    TonAccordionDirective,
    TonAccordionItemDirective,
    TonAccordionTriggerDirective,
    TonAccordionContentDirective,
  ],
  template: `
    <div tonAccordion [multi]="multi()">
      <div tonAccordionItem value="item-1">
        <button tonAccordionTrigger>Item 1</button>
        <div tonAccordionContent><div>Content 1</div></div>
      </div>
      <div tonAccordionItem value="item-2">
        <button tonAccordionTrigger>Item 2</button>
        <div tonAccordionContent><div>Content 2</div></div>
      </div>
    </div>
  `,
})
class TestHostComponent {
  multi = signal(false);
}

describe('Accordion Directives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render accordion items', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonAccordionItem]');
    expect(items.length).toBe(2);
  });

  it('should toggle item on trigger click', () => {
    const trigger = fixture.nativeElement.querySelector('[tonAccordionTrigger]');
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close previous item in single mode', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    triggers[0].click();
    fixture.detectChanges();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');

    triggers[1].click();
    fixture.detectChanges();
    expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('should allow multiple open in multi mode', () => {
    fixture.componentInstance.multi.set(true);
    fixture.detectChanges();

    const triggers = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    triggers[0].click();
    fixture.detectChanges();
    triggers[1].click();
    fixture.detectChanges();

    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });

  it('should apply content visibility classes', () => {
    const content = fixture.nativeElement.querySelector('[tonAccordionContent]');
    expect(content.className).toContain('grid-rows-[0fr]');

    const trigger = fixture.nativeElement.querySelector('[tonAccordionTrigger]');
    trigger.click();
    fixture.detectChanges();

    expect(content.className).toContain('grid-rows-[1fr]');
  });

  it('should move focus with ArrowDown', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    (triggers[0] as HTMLElement).focus();
    triggers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    expect(document.activeElement).toBe(updated[1]);
  });

  it('should move focus with ArrowUp', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    (triggers[1] as HTMLElement).focus();
    triggers[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    expect(document.activeElement).toBe(updated[0]);
  });

  it('should move focus to first with Home', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    (triggers[1] as HTMLElement).focus();
    triggers[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    expect(document.activeElement).toBe(updated[0]);
  });

  it('should move focus to last with End', () => {
    const triggers = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    (triggers[0] as HTMLElement).focus();
    triggers[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    const updated = fixture.nativeElement.querySelectorAll('[tonAccordionTrigger]');
    expect(document.activeElement).toBe(updated[1]);
  });
});

@Component({
  standalone: true,
  imports: [
    TonAccordionDirective,
    TonAccordionItemDirective,
    TonAccordionTriggerDirective,
    TonAccordionContentDirective,
  ],
  template: `
    <div tonAccordion #a="tonAccordion">
      <div tonAccordionItem #i="tonAccordionItem" value="item-1">
        <button tonAccordionTrigger>Item 1</button>
        <div tonAccordionContent><div>Content 1</div></div>
      </div>
    </div>
  `,
})
class ExportAsHost {
  accordion = viewChild<TonAccordionDirective>('a');
  item = viewChild<TonAccordionItemDirective>('i');
}

describe('Accordion exportAs', () => {
  it('should expose tonAccordion via template ref', async () => {
    await TestBed.configureTestingModule({ imports: [ExportAsHost] }).compileComponents();
    const fixture = TestBed.createComponent(ExportAsHost);
    fixture.detectChanges();
    const ref = fixture.componentInstance.accordion();
    expect(ref).toBeTruthy();
    expect(ref!.multi()).toBe(false);
  });

  it('should expose tonAccordionItem via template ref', async () => {
    await TestBed.configureTestingModule({ imports: [ExportAsHost] }).compileComponents();
    const fixture = TestBed.createComponent(ExportAsHost);
    fixture.detectChanges();
    const ref = fixture.componentInstance.item();
    expect(ref).toBeTruthy();
    expect(ref!.isOpen()).toBe(false);
  });
});
