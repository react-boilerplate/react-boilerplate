/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import rootSagas from './sagas';
import createReducer from './reducers';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const createStoreWithMiddleware = compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreWithMiddleware(createReducer(), fromJS(initialState));

  // Create hook for async sagas
  store.runSaga = sagaMiddleware.run;

  // Add sync sagas to middleware
  if (rootSagas.length) rootSagas.map(store.runSaga);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  // Initialize it with no other reducers
  store.asyncReducers = {};
  return store;
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(createReducer(store.asyncReducers));
}
/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSaga(store, saga) {
  store.runSaga(saga);
}
