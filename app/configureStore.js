/**
 * Creates store
 * Creates reducer
 * Creates saga-middleware
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import globalSaga from './containers/App/saga';

export default function configureStore(initialState = {}, history) {
  const composeEnhancers = compose;

  const sagaMiddleware = createSagaMiddleware();

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  sagaMiddleware.run(globalSaga);

  return store;
}
