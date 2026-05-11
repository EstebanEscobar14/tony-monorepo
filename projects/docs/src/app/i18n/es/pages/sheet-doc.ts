export const SHEET_DOC_ES = {
  title: 'Sheet',
  description: 'Un panel que se desliza desde el borde de la pantalla.',
  cartSheet: 'Panel de Carrito',
  tonSheetService: 'TonSheetService',
  tonSheetConfig: 'TonSheetConfig',
  contentDirectives: 'Directivas de contenido',
  contentDirectivesList: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetHeader</code> — Sección de encabezado',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetTitle</code> — Título del panel',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetDescription</code> — Texto de descripción',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetContent</code> — Área de contenido',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonSheetClose</code> — Botón de cerrar',
  ],
  accessibility: [
    'Usa <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">role="dialog"</code> con <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">aria-modal</code> para lectores de pantalla.',
    'El foco queda atrapado dentro del panel cuando está abierto.',
    'Se cierra al presionar la tecla <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">Escape</code> por defecto.',
  ],
  servicePropDescriptions: {
    open: 'Abrir un panel con el componente dado.',
    closeAll: 'Cerrar todos los paneles abiertos.',
  },
  configPropDescriptions: {
    side: 'Borde desde el que se desliza.',
    closeOnBackdrop: 'Cerrar al hacer clic en el fondo.',
    closeOnEsc: 'Cerrar con la tecla Escape.',
    data: 'Datos para inyectar en el componente del panel.',
  },
};
