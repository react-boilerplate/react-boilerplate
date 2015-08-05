import React from 'react';
import App from './components/App.react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { defaultApp } from './reducers/reducers';
import '../css/main.css';

const store = createStore(defaultApp);

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('app')
);
