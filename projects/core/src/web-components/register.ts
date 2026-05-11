export function registerTonyUiElements(): void {
  if (typeof window === 'undefined' || customElements.get('ton-button-wc')) {
    return;
  }

  customElements.define('ton-button-wc', TonyButtonElement);
}

class TonyButtonElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'type'];
  }

  private readonly button = document.createElement('button');
  private readonly contentSlot = document.createElement('slot');

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-flex; }

      button {
        align-items: center;
        border: 1px solid var(--ton-border);
        border-radius: var(--ton-radius, 0.5rem);
        cursor: pointer;
        display: inline-flex;
        font: inherit;
        font-weight: 600;
        gap: 0.5rem;
        justify-content: center;
        min-height: 2.5rem;
        padding: 0.65rem 1rem;
        transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
        white-space: nowrap;
      }

      button.primary {
        background: var(--ton-primary);
        border-color: var(--ton-primary);
        color: var(--ton-primary-foreground);
      }

      button.outline {
        background: var(--ton-background);
        color: var(--ton-foreground);
      }

      button.ghost {
        background: transparent;
        border-color: transparent;
        color: var(--ton-foreground);
      }

      button:hover {
        background: color-mix(in srgb, var(--ton-primary) 10%, var(--ton-background) 90%);
        border-color: color-mix(in srgb, var(--ton-primary) 35%, var(--ton-border) 65%);
        color: var(--ton-foreground);
      }
    `;

    this.button.appendChild(this.contentSlot);
    root.append(style, this.button);
  }

  connectedCallback(): void {
    this.syncAttributes();
  }

  attributeChangedCallback(): void {
    this.syncAttributes();
  }

  private syncAttributes(): void {
    const variant = this.getAttribute('variant') ?? 'primary';
    this.button.className = variant;
    this.button.type = this.getAttribute('type') === 'submit' ? 'submit' : 'button';
  }
}
