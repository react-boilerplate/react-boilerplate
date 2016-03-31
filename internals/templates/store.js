import { createStore, applyMiddleware, compose } from 'redux/es';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import sagaMiddleware from 'redux-saga';
import sagas from './sagas';
import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Imports all the asynchronous flows ("sagas") from the
  //    sagas folder and triggers them
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const createStoreWithMiddleware = compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware(...sagas)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreWithMiddleware(createReducer(), fromJS(initialState));

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.asyncReducers = {};

  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line
  store.replaceReducer(createReducer(store.asyncReducers));
}
