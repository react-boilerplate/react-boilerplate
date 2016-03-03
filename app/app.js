/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'babel-polyfill';

// Load the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import FontFaceObserver from 'fontfaceobserver';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useScrollToTop';
import { fromJS } from 'immutable';
const reduxRouterMiddleware = syncHistory(browserHistory);
import sagaMiddleware from 'redux-saga';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
import styles from './containers/App/styles.css';
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.check().then(() => {
  document.body.classList.add(styles.fontLoaded);
}, () => {
  document.body.classList.remove(styles.fontLoaded);
});

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import '../node_modules/sanitize.css/dist/sanitize.min.css';

// Create and use Redux DevTools
import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';
import DockMonitor from 'redux-devtools-dock-monitor';

const _DEVTOOLS_ = process.env._DEVTOOLS_;
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <Inspector />
  </DockMonitor>
);

let devTools = [];
if (_DEVTOOLS_) {
  devTools = [DevTools.instrument()];
}

// Create the store with two middlewares
// 1. sagaMiddleware: Imports all the asynchronous flows ("sagas") from the
//    sagas folder and triggers them
// 2. reduxRouterMiddleware: Syncs the location/URL path to the state
import rootReducer from './rootReducer';
import sagas from './sagas';
const createStoreWithMiddleware = compose(
  applyMiddleware(reduxRouterMiddleware, sagaMiddleware(...sagas)),
  ...devTools
)(createStore);
const store = createStoreWithMiddleware(rootReducer, fromJS({}));
reduxRouterMiddleware.listenForReplays(store, (state) => state.get('route').location);

// Make reducers hot reloadable, see http://mxs.is/googmo
if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

// Set up the router, wrapping all Routes in the App component
import App from 'App';
import routes from './routes';
const rootRoute = {
  component: App,
  childRoutes: routes,
};

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={useScroll(() => browserHistory)()} routes={rootRoute} />
      { _DEVTOOLS_ ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('app')
);
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
