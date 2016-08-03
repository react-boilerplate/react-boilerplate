import invariant from 'invariant';
import createReducer from 'reducers';

export const isType = type => target => typeof target === type;
export const isFunction = isType('function');

/**
 * Validate the shape of redux store
 */
const reduxKeys = ['dispatch', 'subscribe', 'getState', 'replaceReducer'];
const internalKeys = ['runSaga']; // asyncReducers does not exist yet
const expectedKeys = [...reduxKeys, ...internalKeys];

export function checkStore(store) {
  invariant(
    expectedKeys.reduce((acc, curr) => (acc ? isFunction(store[`${curr}`]) : false), true),
    '(app/utils...) asyncInjectors: Received invalid redux store.'
  );
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isType('string')(name) && name.length && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: `asyncReducer` must be a reducer function'
    );

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas) && sagas.length,
      '(app/utils/injectAsyncSagas...) `sagas` must be an array of generator functions'
    );

    sagas.map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}
