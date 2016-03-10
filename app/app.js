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
import FontFaceObserver from 'fontfaceobserver';
import { browserHistory } from 'react-router';
import useScroll from 'scroll-behavior/lib/useScrollToTop';
import configureStore from './store';

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
import '../node_modules/sanitize.css/sanitize.css';

const store = configureStore();

// Set up the router, wrapping all Routes in the App component
import App from 'App';
import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
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
