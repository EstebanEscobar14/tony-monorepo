import { Injectable, inject, InjectionToken } from '@angular/core';
import { Dialog, DialogRef as CdkDialogRef } from '@angular/cdk/dialog';
import type { ComponentType } from '@angular/cdk/overlay';
import { TonDialogRef } from './dialog-ref';
import { DEFAULT_DIALOG_CONFIG, type TonDialogConfig } from './dialog.types';

export const TON_DIALOG_DATA = new InjectionToken<unknown>('TON_DIALOG_DATA');

@Injectable({ providedIn: 'root' })
export class TonDialogService {
  private readonly cdkDialog = inject(Dialog);

  open<T, R = unknown>(
    component: ComponentType<T>,
    config: TonDialogConfig = {}
  ): TonDialogRef<R> {
    const merged = { ...DEFAULT_DIALOG_CONFIG, ...config };

    // CDK's disableClose controls both backdrop and ESC together.
    // To support independent closeOnBackdrop / closeOnEsc, we disable both
    // at the CDK level and handle them manually.
    const disableClose = !merged.closeOnBackdrop || !merged.closeOnEsc;

    const cdkRef: CdkDialogRef<R, T> = this.cdkDialog.open(component, {
      width: merged.width,
      maxWidth: merged.maxWidth,
      disableClose,
      hasBackdrop: true,
      backdropClass: 'ton-dialog-backdrop',
      panelClass: 'ton-dialog-panel',
      ariaLabelledBy: merged.ariaLabelledBy,
      ariaDescribedBy: merged.ariaDescribedBy,
      data: merged.data,
      providers: merged.data != null
        ? [{ provide: TON_DIALOG_DATA, useValue: merged.data }]
        : [],
    });

    // When CDK disableClose is true, manually handle backdrop/ESC based on config
    if (disableClose) {
      if (merged.closeOnBackdrop) {
        const sub = cdkRef.backdropClick.subscribe(() => cdkRef.close());
        cdkRef.closed.subscribe(() => sub.unsubscribe());
      }
      if (merged.closeOnEsc) {
        const sub = cdkRef.keydownEvents.subscribe(event => {
          if (event.key === 'Escape') {
            cdkRef.close();
          }
        });
        cdkRef.closed.subscribe(() => sub.unsubscribe());
      }
    }

    return new TonDialogRef<R>(cdkRef);
  }

  closeAll(): void {
    this.cdkDialog.closeAll();
  }
}
