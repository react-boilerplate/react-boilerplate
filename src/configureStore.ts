/**
 * Create the store with dynamic reducers
 */

import { applyMiddleware, createStore, compose, StoreEnhancer } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import createReducer from './reducers';
import { ApplicationRootState, InjectedStore } from 'types';

export default function configureStore(
  initialState: ApplicationRootState | {} = {},
  history: History,
) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [
    applyMiddleware(...middlewares),
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  let enhancer: StoreEnhancer;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    enhancer = composeWithDevTools(...enhancers);
    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
  } else {
    enhancer = compose(...enhancers);
  }

  const store = createStore(
    createReducer(),
    initialState,
    enhancer,
  ) as InjectedStore;

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}
