/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import * as serviceWorker from './serviceWorker';

import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'features/App';

// Import Language Provider

// Load the favicon and the .htaccess file
// import '!file-loader?name=[name].[ext]!./images/favicon.ico';
// import 'file-loader?name=.htaccess!./.htaccess';

import { HelmetProvider } from 'react-helmet-async';

import configureStore from './store/configureStore';

import './locales/i18n';
import ThemeProvider from 'styles/theme/ThemeProvider';

// Observe loading of Inter (to remove 'Inter', remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Inter', {});

// When Inter is loaded, add a font-family using Inter to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const ConnectedApp = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ConnectedRouter history={history}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
const render = () => {
  ReactDOM.render(<ConnectedApp />, MOUNT_NODE);
};

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render();
//   });
// }

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
