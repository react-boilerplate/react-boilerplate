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

// Import all the third party stuff
import { browserHistory } from 'react-router';
import FontFaceObserver from 'fontfaceobserver';
import configureStore from './store';

// Import CSS reset and Global Styles
import 'sanitize.css/sanitize.css';

import renderInBrowser from './renderInBrowser';
import ensureIntlSupport from './ensureIntlSupport';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = window.APP_STATE || {};

const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import syncHistoryWithStore from './syncHistoryWithStore';
const history = syncHistoryWithStore(browserHistory, store);

import createRootRoute from './routes';
const rootRoute = createRootRoute(store);

function render() {
  renderInBrowser({ messages: translationMessages, store, rootRoute, history });
}

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', render);
}

ensureIntlSupport()
  .then(render);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
