import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { homeReducer } from './reducers/reducers';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import HomePage from './components/HomePage.react';
import ReadmePage from './components/ReadmePage.react';

import '../css/main.css';

const store = createStore(homeReducer);

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route path="/" component={HomePage} />
        <Route path="/readme" component={ReadmePage} />
      </Router>
    }
  </Provider>,
  document.getElementById('app')
);
