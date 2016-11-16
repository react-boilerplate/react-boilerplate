/* eslint-disable react/jsx-filename-extension */
import 'babel-polyfill'; // for regeneratorRuntime

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import createStore from 'store';
import Helmet from 'react-helmet';
import createRoutes from 'routes';
import { END } from 'redux-saga';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import HtmlDocument from 'components/HtmlDocument';

import Root from './Root';
import { translationMessages } from './i18n';

function renderAppToString(store, renderProps) {
  return renderToString(
    <Root store={store} messages={translationMessages}>
      <RouterContext {...renderProps} />
    </Root>
  );
}

async function renderHtmlDocument({ store, renderProps, allTasks, webpackDllNames }) {
  // 1st render phase - triggers the sagas
  renderAppToString(store, renderProps);

  // send singal to sagas that we're done
  store.dispatch(END);

  // wait for all tasks to finish
  await Promise.all(allTasks.map((t) => t.done));

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
      css={css}
      webpackDllNames={webpackDllNames}
    />
  );
  return `<!DOCTYPE html>\n${doc}`;
}

module.exports = function ssr(url, { webpackDllNames = [] }, callback) {
  const allTasks = [];

  const history = createMemoryHistory(url);
  const store = createStore({}, history);

  const saveRunSaga = store.runSaga;
  store.runSaga = function interceptRunSaga(saga) {
    const task = saveRunSaga.call(store, saga);
    allTasks.push(task);
    return task;
  };

  const routes = createRoutes(store);

  match({ routes, location: url }, (error, redirectLocation, renderProps) => {
    if (error) {
      callback(error);
    } else if (redirectLocation) {
      callback(error, redirectLocation);
    } else if (renderProps) {
      renderHtmlDocument({ store, renderProps, allTasks, webpackDllNames })
        .then((html) => callback(error, redirectLocation, html))
        .catch(callback);
    } else {
      callback(error, redirectLocation, null);
    }
  });
};
