import createReducer from '../reducers';

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga if it's not already started.
 * If the saga is previously loaded it will prevent starting duplicate instances
 * of the same saga. See http://mxs.is/googng.
 */
export function injectAsyncSagas(store) {
  return (name, sagas) => {
    if (!store.asyncSagas[name]) {
      store.asyncSagas[name] = sagas; // eslint-disable-line
      sagas.forEach(store.runSaga);
    }
  };
}

/**
 * Helper for creating injectors
 */
export function getHooks(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  };
}
