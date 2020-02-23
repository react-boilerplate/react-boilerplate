/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

import { HelmetProvider } from 'react-helmet-async';
import configureStore from './configureStore';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const ConnectedApp = () => (
  <Provider store={store}>
    <LanguageProvider>
      <ConnectedRouter history={history}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
);

ConnectedApp.propTypes = {};

const render = () => {
  ReactDOM.render(<ConnectedApp />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // Hot reloadable translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
if (!Intl.PluralRules || !Intl.RelativeTimeFormat) {
  new Promise(resolve => {
    if (!Intl.PluralRules) {
      resolve(
        Promise.all([
          import('@formatjs/intl-pluralrules/polyfill'),
          import('@formatjs/intl-pluralrules/dist/locale-data/en'),
          import('@formatjs/intl-pluralrules/dist/locale-data/de'),
        ]),
      );
    } else {
      resolve();
    }
  })
    .then(() => {
      if (!Intl.RelativeTimeFormat) {
        return Promise.all([
          import('@formatjs/intl-relativetimeformat/polyfill'),
          import('@formatjs/intl-relativetimeformat/dist/locale-data/en'),
          import('@formatjs/intl-relativetimeformat/dist/locale-data/de'),
        ]);
      }
      return Promise.resolve();
    }) // eslint-disable-line prettier/prettier
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
