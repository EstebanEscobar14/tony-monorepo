import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  TonTimelineDirective,
  TonTimelineItemDirective,
  TonTimelineStartDirective,
  TonTimelineMiddleDirective,
  TonTimelineEndDirective,
} from './timeline.directives';

@Component({
  standalone: true,
  imports: [TonTimelineDirective, TonTimelineItemDirective, TonTimelineStartDirective, TonTimelineMiddleDirective, TonTimelineEndDirective],
  template: `
    <div tonTimeline>
      <div tonTimelineItem>
        <div tonTimelineStart>2024</div>
        <div tonTimelineMiddle variant="primary"></div>
        <div tonTimelineEnd>Event 1</div>
      </div>
      <div tonTimelineItem>
        <div tonTimelineStart>2025</div>
        <div tonTimelineMiddle></div>
        <div tonTimelineEnd>Event 2</div>
      </div>
    </div>
  `,
})
class TestHostComponent {}

describe('TonTimelineDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render with list role', () => {
    const timeline = fixture.nativeElement.querySelector('[tonTimeline]');
    expect(timeline.getAttribute('role')).toBe('list');
  });

  it('should render items with listitem role', () => {
    const items = fixture.nativeElement.querySelectorAll('[tonTimelineItem]');
    expect(items.length).toBe(2);
    expect(items[0].getAttribute('role')).toBe('listitem');
  });

  it('should mark middle as aria-hidden', () => {
    const middles = fixture.nativeElement.querySelectorAll('[tonTimelineMiddle]');
    expect(middles[0].getAttribute('aria-hidden')).toBe('true');
  });
});
