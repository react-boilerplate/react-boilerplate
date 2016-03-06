import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import sagaMiddleware from 'redux-saga';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
const reduxRouterMiddleware = syncHistory(browserHistory);
import sagas from './sagas';
import createReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Imports all the asynchronous flows ("sagas") from the
  //    sagas folder and triggers them
  // 2. reduxRouterMiddleware: Syncs the location/URL path to the state
  const createStoreWithMiddleware = compose(
    applyMiddleware(reduxRouterMiddleware, sagaMiddleware(...sagas)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  const store = createStoreWithMiddleware(createReducer(), fromJS(initialState));
  reduxRouterMiddleware.listenForReplays(store, (state) => state.get('route').location);

// Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
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
