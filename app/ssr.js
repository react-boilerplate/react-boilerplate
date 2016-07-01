/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';

export function renderComponentWithRoot(Component, componentProps, store) {
  const componentHtml = renderToStaticMarkup(
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>
  );

  const head = Helmet.rewind();
  const initialState = store.getState();

  return '<!doctype html>\n' + renderToStaticMarkup(
    <Root content={componentHtml} initialState={initialState} head={head} />
  );
}

export function handleError(res, error) {
  res.status(500).send(error.message);
}

export function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

export function routeIsUnmatched(renderProps) {
  return renderProps.routes[renderProps.routes.length - 1].path === '*';
}

export function handleRoute(res, renderProps) {
  console.log('Handling Route', status, res.path, res.url);

  const store = configureStore();
  const status = routeIsUnmatched(renderProps) ? 404 : 200;
  const readyOnAllActions = renderProps.components
    .filter((component) => component.readyOnActions)
    .map((component) => component.readyOnActions(store.dispatch, renderProps.params));
  
  Promise
    .all(readyOnAllActions)
    .then(() => res.status(status).send(renderComponentWithRoot(RouterContext, renderProps, store)));
}

export function requestHandler(req, res) {
  console.log('Request Handler', req.url);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(error);
    } else if (redirectLocation) {
      handleRedirect(res, redirectLocation);
    } else if (renderProps) {
      handleRoute(res, renderProps);
    } else {
      // This should actually never happen, as Routes.js has a catch-all '*' path.
      res.sendStatus(404);
    }
  });
}

export default requestHandler
