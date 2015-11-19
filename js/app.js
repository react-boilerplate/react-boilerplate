import 'file?name=[name].[ext]!../serviceworker.js';
import 'file?name=[name].[ext]!../serviceworker-cache-polyfill.js';
import 'file?name=[name].[ext]!../manifest.json';
import 'fontfaceobserver/fontfaceobserver.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then(() => {
    // Registration was successful
  }).catch(() => {
    // Registration failed
  });
} else {
  // No ServiceWorker Support
}

// Observer loading of Open Sans
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add the js-open-sans-loaded class to the body
openSansObserver.check().then(() => {
  document.body.classList.add('js-open-sans-loaded');
}, () => {
  document.body.classList.remove('js-open-sans-loaded');
});

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { homeReducer } from './reducers/reducers';
import { Router, Route } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import HomePage from './components/HomePage.react';
import ReadmePage from './components/ReadmePage.react';

import '../css/main.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(homeReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={createHistory()}>
      <Route path="/" component={HomePage} />
      <Route path="/readme" component={ReadmePage} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
