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
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store) {
  const prevSagas = [];

  return sagas => sagas.forEach(saga => {
    if (!prevSagas.includes(saga)) {
      store.runSaga(saga);
      prevSagas.push(saga);
    }
  });
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  };
}
