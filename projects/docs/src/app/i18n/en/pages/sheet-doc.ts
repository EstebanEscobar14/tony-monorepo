export const SHEET_DOC_EN = {
  title: 'Sheet',
  description: 'A panel that slides out from the edge of the screen.',
  cartSheet: 'Cart Sheet',
  tonSheetService: 'TonSheetService',
  tonSheetConfig: 'TonSheetConfig',
  contentDirectives: 'Content directives',
  contentDirectivesList: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetHeader</code> — Header section',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetTitle</code> — Sheet title',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetDescription</code> — Description text',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetContent</code> — Content area',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetClose</code> — Close button',
  ],
  accessibility: [
    'Uses <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="dialog"</code> with <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-modal</code> for screen readers.',
    'Focus is trapped within the sheet when open.',
    'Closes on <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Escape</code> key press by default.',
  ],
  servicePropDescriptions: {
    open: 'Open a sheet with the given component.',
    closeAll: 'Close all open sheets.',
  },
  configPropDescriptions: {
    side: 'Edge to slide from.',
    closeOnBackdrop: 'Close when clicking the backdrop.',
    closeOnEsc: 'Close on Escape key.',
    data: 'Data to inject into the sheet component.',
  },
};
