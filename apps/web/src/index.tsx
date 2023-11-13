import './wdyr';
import React from 'react';
import SENTRY_CONFIG from '@/sentry/config';
import { init as initSentry } from '@sentry/react';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';

initSentry(SENTRY_CONFIG);

export const history = createBrowserHistory();

function render(Component): void {
  const MOUNT_NODE: any =
    document.getElementById('root') || document.createElement('div');
  const root = createRoot(MOUNT_NODE);
  if (root) {
    return root.render(
      <React.StrictMode>
        <Component history={history} />
      </React.StrictMode>,
    );
  }
}

render(App);
