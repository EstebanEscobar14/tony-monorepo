import { Component, signal } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TonStatDirective, TonStatTitleDirective, TonStatValueDirective, TonStatDescriptionDirective, type StatDescriptionVariant } from './stat.directives';

@Component({
  standalone: true,
  imports: [TonStatDirective, TonStatTitleDirective, TonStatValueDirective, TonStatDescriptionDirective],
  template: `
    <div tonStat>
      <div tonStatTitle>Total Revenue</div>
      <div tonStatValue>$45,231</div>
      <div tonStatDescription [variant]="descVariant()">+20.1% from last month</div>
    </div>
  `,
})
class TestHostComponent {
  descVariant = signal<StatDescriptionVariant>('default');
}

describe('TonStatDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render stat sections', () => {
    expect(fixture.nativeElement.querySelector('[tonStat]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[tonStatTitle]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[tonStatValue]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[tonStatDescription]')).toBeTruthy();
  });

  it('should apply success variant to description', () => {
    fixture.componentInstance.descVariant.set('success');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('[tonStatDescription]');
    expect(desc.className).toContain('text-green-600');
  });

  it('should apply error variant to description', () => {
    fixture.componentInstance.descVariant.set('error');
    fixture.detectChanges();
    const desc = fixture.nativeElement.querySelector('[tonStatDescription]');
    expect(desc.className).toContain('text-destructive');
  });

  it('should have auto-generated id on title', () => {
    const title = fixture.nativeElement.querySelector('[tonStatTitle]');
    expect(title.id).toContain('ton-stat-title-');
  });

  it('should set aria-labelledby on value pointing to title id', () => {
    const title = fixture.nativeElement.querySelector('[tonStatTitle]');
    const value = fixture.nativeElement.querySelector('[tonStatValue]');
    expect(value.getAttribute('aria-labelledby')).toBe(title.id);
  });
});
