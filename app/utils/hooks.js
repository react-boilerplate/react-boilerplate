import createReducer from '../reducers';

// const runnedSagas = [];
const runnedSagas = [];

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer; // eslint-disable-line
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store) {
  return (sagas) => {
    sagas.map((saga) => {
      if (runnedSagas.indexOf(runnedSagas) === -1) {
        runnedSagas.push(runnedSagas);
        return store.runSaga(saga);
      }
      return false;
    });
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
