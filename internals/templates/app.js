/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';
import { browserHistory } from 'react-router';

/* eslint-disable import/no-unresolved, import/extensions */
// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset
import 'sanitize.css/sanitize.css';

// Import all the third party stuff
import './setup/openSansObserver';
import syncHistoryWithStore from './setup/syncHistoryWithStore';
import ensureIntlSupport from './setup/ensureIntlSupport';
import configureStore from './store';
import renderInBrowser from './renderInBrowser';
import createRoutes from './routes';
// Import i18n messages
import { translationMessages as messages } from './i18n';

// The initial state of the app can be set on the server
const initialState = window.APP_STATE || {};

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const store = configureStore(initialState, browserHistory);

const routes = createRoutes(store);

const history = syncHistoryWithStore(browserHistory, store);

function render() {
  renderInBrowser({ messages, store, routes, history });
}

ensureIntlSupport()
  .then(render);

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', render);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
