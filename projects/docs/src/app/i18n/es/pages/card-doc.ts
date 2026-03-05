export const CARD_DOC_ES = {
  title: 'Card',
  description: 'Muestra una tarjeta con encabezado, contenido y pie de página.',
  examplesDesc: 'Patrones de uso del mundo real con gestión de estado.',
  selectableCardList: 'Lista de Tarjetas Seleccionables',
  subDirectivesTitle: 'Sub-directivas',
  subDirectives: [
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonCardHeader</code> — Contenedor de columna flex con espaciado',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonCardTitle</code> — Encabezado estilizado',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonCardDescription</code> — Texto de descripción atenuado',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonCardContent</code> — Área de contenido con relleno',
    '<code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tonCardFooter</code> — Pie de página en fila flex',
  ],
  tonCardDirective: 'TonCardDirective',
  propDescriptions: {
    variant: 'El estilo visual de la tarjeta.',
    padding: 'Relleno aplicado a la tarjeta.',
    class: 'Clases CSS adicionales a aplicar.',
  },
};
