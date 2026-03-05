import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { AnalyticsDashboard } from './dashboard';

class AnalyticsElement extends HTMLElement {
  private mountPoint?: HTMLDivElement;
  private root?: Root;

  connectedCallback(): void {
    if (!this.root) {
      this.style.display = 'block';
      this.mountPoint = document.createElement('div');
      this.replaceChildren(this.mountPoint);
      this.root = createRoot(this.mountPoint);
    }

    this.root.render(
      <StrictMode>
        <AnalyticsDashboard />
      </StrictMode>
    );
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = undefined;
    this.mountPoint = undefined;
  }
}

export function defineAnalyticsElement(): void {
  if (!customElements.get('mfe-analytics-root')) {
    customElements.define('mfe-analytics-root', AnalyticsElement);
  }
}
