import { Injectable, inject } from '@angular/core';
import { TonDialogService } from '../modal/dialog.service';
import type { TonDialogRef } from '../modal/dialog-ref';
import { TonCommandPaletteComponent } from './command-palette.component';
import type { CommandPaletteConfig } from './command-palette.types';

@Injectable({ providedIn: 'root' })
export class TonCommandPaletteService {
  private readonly dialogService = inject(TonDialogService);
  private isOpen = false;

  open(config: CommandPaletteConfig): TonDialogRef<void> | null {
    if (this.isOpen) return null;
    this.isOpen = true;

    const ref = this.dialogService.open<TonCommandPaletteComponent, void>(
      TonCommandPaletteComponent,
      {
        width: config.width ?? '32rem',
        data: config,
      }
    );

    ref.closed.subscribe(() => {
      this.isOpen = false;
    });

    return ref;
  }

  close(): void {
    if (this.isOpen) {
      this.dialogService.closeAll();
    }
  }
}
