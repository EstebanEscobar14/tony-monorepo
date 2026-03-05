import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonRadialProgressComponent } from './radial-progress.component';

@Component({
  standalone: true,
  imports: [TonRadialProgressComponent],
  template: `<ton-radial-progress [value]="value()">{{ value() }}%</ton-radial-progress>`,
})
class TestHostComponent {
  value = signal(75);
}

describe('TonRadialProgressComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('ton-radial-progress');
  });

  it('should render with progressbar role', () => {
    expect(host.getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow', () => {
    expect(host.getAttribute('aria-valuenow')).toBe('75');
  });

  it('should render SVG circles', () => {
    const circles = host.querySelectorAll('circle');
    expect(circles.length).toBe(2);
  });

  it('should project content', () => {
    expect(host.textContent).toContain('75%');
  });
});
