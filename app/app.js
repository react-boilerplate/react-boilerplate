/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

/* eslint-disable import/no-unresolved, import/extensions */
// Load the favicon, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./favicon.ico';
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

// Import CSS reset
import 'sanitize.css/sanitize.css';

// Import all the third party stuff
import { browserHistory } from 'react-router';
import configureStore from './store';
import syncHistoryWithStore from './syncHistoryWithStore';
import renderInBrowser from './renderInBrowser';
import ensureIntlSupport from './ensureIntlSupport';
import createRoutes from './routes';
import { translationMessages as messages } from './i18n';
import './openSansObserver';

// The initial state of the app can be set on the server
const initialState = window.APP_STATE || {};

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const store = configureStore(initialState, browserHistory);

const routes = createRoutes(store);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
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
