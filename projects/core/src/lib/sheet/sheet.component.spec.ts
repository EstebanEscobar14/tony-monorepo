import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { TonSheetService } from './sheet.service';
import {
  TonSheetHeaderDirective,
  TonSheetTitleDirective,
  TonSheetDescriptionDirective,
  TonSheetCloseDirective,
} from './sheet.directives';
import { TonButtonDirective } from '../button/button.directive';

@Component({
  standalone: true,
  imports: [
    TonSheetHeaderDirective,
    TonSheetTitleDirective,
    TonSheetDescriptionDirective,
    TonSheetCloseDirective,
    TonButtonDirective,
  ],
  template: `
    <div>
      <div tonSheetHeader>
        <h2 tonSheetTitle>Test Sheet</h2>
        <p tonSheetDescription>A test sheet.</p>
      </div>
      <button tonSheetClose aria-label="Close">X</button>
      <button tonBtn (click)="dialogRef.close('done')">Done</button>
    </div>
  `,
})
class TestSheetComponent {
  readonly dialogRef = inject(DialogRef);
}

describe('TonSheetService', () => {
  let service: TonSheetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogModule],
    }).compileComponents();

    service = TestBed.inject(TonSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a sheet', () => {
    const ref = service.open(TestSheetComponent, { side: 'right' });
    expect(ref).toBeTruthy();
    ref.close();
  });

  it('should open from different sides', () => {
    const refLeft = service.open(TestSheetComponent, { side: 'left' });
    expect(refLeft).toBeTruthy();
    refLeft.close();

    const refTop = service.open(TestSheetComponent, { side: 'top' });
    expect(refTop).toBeTruthy();
    refTop.close();
  });
});
