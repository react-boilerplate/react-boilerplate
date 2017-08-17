/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { StaticRouter } from 'react-router-dom'
import { createStore } from 'redux'
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import Helmet from 'react-helmet';
import 'sanitize.css/sanitize.css';
import { END } from 'redux-saga';
import { renderToString } from 'react-dom/server';
import createReducer from './reducers';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// // Load the favicon, the manifest.json file and the .htaccess file
// /* eslint-disable import/no-webpack-loader-syntax */
// import '!file-loader?name=[name].[ext]!./favicon.ico';
// import '!file-loader?name=[name].[ext]!./manifest.json';
// import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
// /* eslint-enable import/no-webpack-loader-syntax */

// Import i18n messages
import { appLocales, translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './global-styles';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};

function is404(routes) {
    return routes.some((r) => r.name === 'notfound');
  }

async function renderAppToStringAtLocation(url, { webpackDllNames = [], assets, lang }, callback) {

  const store = createStore(createReducer, initialState);
  const state = store.getState().toJS()
  store.dispatch(END);
  await sagasDone();
  const context = {}
  const app =  renderToString(
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <StaticRouter location={url} context={context}>
          <App store={store} />
        </StaticRouter>
      </LanguageProvider>
    </Provider>
  );

  const styleSheet = new ServerStyleSheet();

  app = styleSheet ? styleSheet.collectStyles(app) : app

  const html = renderToStaticMarkup(
    <HtmlDocument
      appMarkup={app}
      lang={state.language.locale}
      state={state}
      head={Helmet.rewind()}
      assets={assets}
      css={styleSheet.getStyleElement}
      webpackDllNames={webpackDllNames}
    />
  );
  return `<!DOCTYPE html>\n${doc}`;

  const routes = ['/', '/features', '']

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

export {
    appLocales,
    renderAppToStringAtLocation
}


