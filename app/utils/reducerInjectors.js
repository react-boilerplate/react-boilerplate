import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../reducers';
import {
  DAEMON,
  RESTART_ON_REMOUNT,
} from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON];

export function injectReducerFactory(store, isValid) {
  return function injectReducer(key, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    // otherwise daemon reducers won't hot reload
    if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) return;

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export function ejectReducerFactory(store, isValid) {
  return function ejectReducer(key, mode = RESTART_ON_REMOUNT) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key),
      '(app/utils...) injectReducer: Expected `key` and `mode` to be a non empty string with a correct value'
    );

    invariant(
      isString(mode) && allowedModes.includes(mode),
      `(app/utils...) injectReducer: Expected \`mode\` to be one of: ${allowedModes.join(', ')}`
    );

    if (mode !== DAEMON) {
      Reflect.deleteProperty(store.injectedReducers, key);
      store.replaceReducer(createReducer(store.injectedReducers));
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
    ejectReducer: ejectReducerFactory(store, true),
  };
}
