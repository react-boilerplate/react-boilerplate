/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';

// Renders  react element into dom
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// synchronizes router state with Redux store
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Imports root app
import App from 'containers/App';

// logic for Create store and saga Middleware
import configureStore from './configureStore';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

// Get Id of root element, defined in index.html in root folder
const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
