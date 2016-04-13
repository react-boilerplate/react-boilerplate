import React from 'react';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById('app');

// Render the root component normally
let render = () => {
  const rootContainer = require('./app').default;
  ReactDOM.render(
    rootContainer,
    rootEl
  );
};

// Are we in development mode?
// If we are, enable component hot reloading
// and display an overlay for runtime errors
if (module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
      rootEl
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  // possibly remove callback in React 15
  module.hot.accept('./app', () => {
    setTimeout(render);
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
