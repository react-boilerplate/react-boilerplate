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
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import Helmet from 'react-helmet';
import { END } from 'redux-saga';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import monitorSagas from 'utils/monitorSagas';
import HtmlDocument from 'components/HtmlDocument';
import configureStore from 'store';
import { ServerStyleSheet } from 'styled-components';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

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

async function renderAppToStringAtLocation(url, { webpackDllNames = [], assets, lang }, callback) {
  try {
    const store = configureStore({});
    const state = store.getState().toJS();
    store.dispatch(END);
    const sagasDone = monitorSagas(store);
    await sagasDone();
    const context = {};
    let app =
      (<Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <StaticRouter location={url} context={context}>
            <App store={store} />
          </StaticRouter>
        </LanguageProvider>
      </Provider>);

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
    callback({ html, notFound, redirectLocation });
  } catch (e) {
    callback({ html: '', error: { message: `Server Error occured ${e}` } });
  }
}

export {
    appLocales,
    renderAppToStringAtLocation,
};
