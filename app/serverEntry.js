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
import { match } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { fromJS } from 'immutable';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import Helmet from 'react-helmet';
import { END } from 'redux-saga';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import {createServerReducer} from './reducers';
import monitorSagas from 'utils/monitorSagas';
import configureStore from './store';
import HtmlDocument from 'components/HtmlDocument';

import { ServerStyleSheet } from 'styled-components';

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
const initialState = {}


async function renderAppToStringAtLocation(url, { webpackDllNames = [], assets, lang }, callback) {
  try{
  const store = configureStore({})
  const state = store.getState().toJS();
  store.dispatch(END);
  const sagasDone = monitorSagas(store);
  await sagasDone();
  const context = {}
  let app =  
    <Provider store={store}>
      <LanguageProvider messages={translationMessages}>
        <StaticRouter location={url} context={context}>
          <App store={store} />
        </StaticRouter>
      </LanguageProvider>
    </Provider>
  

  const styleSheet = new ServerStyleSheet();

  app = renderToString(styleSheet ? styleSheet.collectStyles(app) : app);

  let html = renderToStaticMarkup(
    <HtmlDocument
      appMarkup={app}
      lang={state.language.locale}
      state={state}
      head={Helmet.rewind()}    
      assets={assets}
      css={styleSheet.getStyleElement()}
      webpackDllNames={webpackDllNames}
    />
  );
  html = `<!DOCTYPE html>\n${html}`;

  const notFound = context.status === '404';
  const redirectLocation = context.redirectLocation;
  callback({ html, notFound, redirectLocation});
  }catch (e){
    callback({html:'', error: {message:"Server Error occured"}})
  }
};

export {
    appLocales,
    renderAppToStringAtLocation
}


