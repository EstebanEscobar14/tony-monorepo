import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { registerTonyUiElements } from '@tony-ui/core/web-components/register';
import App from './app/app';
import { defineAnalyticsElement } from './app/analytics-element';

registerTonyUiElements();
defineAnalyticsElement();

const mountNode = document.getElementById('root');
if (mountNode) {
  const root = ReactDOM.createRoot(mountNode);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
