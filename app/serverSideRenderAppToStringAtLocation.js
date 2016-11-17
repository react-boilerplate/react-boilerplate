/* eslint-disable react/jsx-filename-extension */
import 'babel-polyfill'; // for regeneratorRuntime

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { END } from 'redux-saga';
import Helmet from 'react-helmet';
import styleSheet from 'styled-components/lib/models/StyleSheet';

import createStore from 'store';
import createRoutes from 'routes';
import HtmlDocument from 'components/HtmlDocument';

import AppContainer from 'containers/AppContainer';
import { translationMessages } from './i18n';
import syncHistoryWithStore from './syncHistoryWithStore';

function renderAppToString(store, renderProps) {
  return renderToString(
    <AppContainer store={store} messages={translationMessages}>
      <RouterContext {...renderProps} />
    </AppContainer>
  );
}

async function renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames }) {
  // 1st render phase - triggers the sagas
  renderAppToString(store, renderProps);

  // send singal to sagas that we're done
  store.dispatch(END);

  // wait for all tasks to finish
  await sagasDone();

  // capture the state after the first render
  const state = store.getState().toJS();

  // 2nd render phase - the sagas triggered in the first phase are resolved by now
  const appContent = renderAppToString(store, renderProps);

  // capture the generated css
  const css = styleSheet.rules().map((rule) => rule.cssText).join('\n');
  const doc = renderToStaticMarkup(
    <HtmlDocument
      appContent={appContent}
      lang={state.language.locale}
      state={state}
      head={Helmet.rewind()}
      assets={assets}
      css={css}
      webpackDllNames={webpackDllNames}
    />
  );
  return `<!DOCTYPE html>\n${doc}`;
}

function monitorSagas(store) {
  const allTasks = [];
  const saveRunSaga = store.runSaga;

  store.runSaga = function interceptRunSaga(saga) { // eslint-disable-line no-param-reassign
    const task = saveRunSaga.call(store, saga);
    allTasks.push(task);
    return task;
  };

  return function done() {
    return Promise.all(allTasks.map((t) => t.done));
  };
}

function is404(routes) {
  return routes.some((r) => r.name === 'notfound');
}

module.exports = function serverSideRenderAppToStringAtLocation(url, { webpackDllNames = [], assets }, callback) {
  const memHistory = createMemoryHistory(url);
  const store = createStore({}, memHistory);

  syncHistoryWithStore(memHistory, store);

  const routes = createRoutes(store);

  const sagasDone = monitorSagas(store);

  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback({ error });
    } else if (redirectLocation) {
      callback({ redirectLocation: redirectLocation.pathname + redirectLocation.search });
    } else if (renderProps) {
      renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames })
        .then((html) => {
          const notFound = is404(renderProps.routes);
          callback({ html, notFound });
        })
        .catch((e) => callback({ error: e }));
    } else {
      callback({ error: new Error('Unknown error') });
    }
  });
};
