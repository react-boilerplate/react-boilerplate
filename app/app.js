/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
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
import { createStore, applyMiddleware } from 'redux';
import FontFaceObserver from 'fontfaceobserver';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import useScroll from 'scroll-behavior/lib/useScrollToTop';
import { fromJS } from 'immutable';
const reduxRouterMiddleware = syncHistory(browserHistory);
import sagaMiddleware from 'redux-saga';

// Observer loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
import styles from './containers/App/styles.css';
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add the js-open-sans-loaded class to the body
openSansObserver.check().then(() => {
  document.body.classList.add(styles.fontLoaded);
}, () => {
  document.body.classList.remove(styles.fontLoaded);
});

// Import the pages
import App from 'App';

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder
import '../node_modules/sanitize.css/dist/sanitize.min.css';

/*
*   Create the store with two middlewares :
*   1. redux-thunk : Allow us to asynchronous things in the actions
*   2. reduxRouterMiddleware : Sync dispatched route actions to the history
*/

import rootReducer from './rootReducer';
import sagas from './sagas';
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, sagaMiddleware(...sagas))(createStore);
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
import routes from './routes';
const rootRoute = {
  component: App,
  childRoutes: routes
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={useScroll(() => browserHistory)()} routes={rootRoute} />
  </Provider>,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
