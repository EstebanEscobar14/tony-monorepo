import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonToasterComponent } from './toaster.component';
import { TonToastService } from './toast.service';

@Component({
  standalone: true,
  imports: [TonToasterComponent],
  template: `<ton-toaster />`,
})
class TestHostComponent {}

describe('TonToasterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let service: TonToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    service = TestBed.inject(TonToastService);
    fixture.detectChanges();
  });

  it('should render region with aria-label', () => {
    const region = fixture.nativeElement.querySelector('[role="region"]');
    expect(region).toBeTruthy();
    expect(region.getAttribute('aria-label')).toBe('Notifications');
  });

  it('should render toast items with aria-atomic="true"', () => {
    service.show({ title: 'Test toast' });
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert).toBeTruthy();
    expect(alert.getAttribute('aria-atomic')).toBe('true');
    expect(alert.getAttribute('aria-live')).toBe('polite');
  });
});
