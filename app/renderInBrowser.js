import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppContainer from 'containers/AppContainer';

import './global-styles';

export default function renderInBrowser({ messages, store, rootRoute, history }) {
  ReactDOM.render(
    <AppContainer store={store} messages={messages}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </AppContainer>,
    document.getElementById('app')
  );
}
