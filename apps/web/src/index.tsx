import React from 'react';
import SENTRY_CONFIG from '@/sentry/config';
import { init as initSentry } from '@sentry/react';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './configureStore';
import './wdyr.js';
import './index.scss';

initSentry(SENTRY_CONFIG);

export const history = createBrowserHistory();
export const store = configureStore({} as any);

function render(Component): void {
  const MOUNT_NODE: any =
    document.getElementById('root') || document.createElement('div');
  const root = createRoot(MOUNT_NODE);
  if (root) {
    return root.render(
      <Provider store={store}>
        <Component history={history} />
      </Provider>,
    );
  }
}

render(App);
