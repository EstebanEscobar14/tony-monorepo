export interface TonDialogConfig {
  width?: string;
  maxWidth?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  data?: unknown;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export const DEFAULT_DIALOG_CONFIG: TonDialogConfig = {
  width: '28rem',
  maxWidth: '90vw',
  closeOnBackdrop: true,
  closeOnEsc: true,
};
