import React from 'react';
import ReactDOM from 'react-dom';
import { match, applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppRoot from 'containers/AppRoot';

export default function renderInBrowser({ messages, store, routes, history }) {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
      <AppRoot store={store} messages={messages}>
        <Router
          {...renderProps}
          render={
            // Scroll to top when going to a new page, imitating default browser behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </AppRoot>,
      document.getElementById('app')
    );
  });
}
