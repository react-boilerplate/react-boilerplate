import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import Root from 'Root';

export default function renderInBrowser({ messages, store, rootRoute, history }) {
  ReactDOM.render(
    <Root store={store} messages={messages}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </Root>,
    document.getElementById('app')
  );
}
