export type SheetSide = 'left' | 'right' | 'top' | 'bottom';

export interface TonSheetConfig {
  side?: SheetSide;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  data?: unknown;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export const DEFAULT_SHEET_CONFIG: TonSheetConfig = {
  side: 'right',
  closeOnBackdrop: true,
  closeOnEsc: true,
};

export const SHEET_PANEL_CLASS: Record<SheetSide, string> = {
  right: 'ton-sheet-right',
  left: 'ton-sheet-left',
  top: 'ton-sheet-top',
  bottom: 'ton-sheet-bottom',
};
