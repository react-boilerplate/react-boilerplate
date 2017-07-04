import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import checkStore from './checkStore';
import createReducer from '../reducers';

const allowedModes = ['restart-on-remount', 'daemon'];

export function injectReducerFactory(store, isValid) {
  return function injectReducer(name, reducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function'
    );

    // Check `store.injectedReducers[name] === reducer` for hot reloading when a name is the same but a reducer is different
    // otherwise daemon reducers won't hot reload
    if (Reflect.has(store.injectedReducers, name) && store.injectedReducers[name] === reducer) return;

    store.injectedReducers[name] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.injectedReducers));
  };
}

export function ejectReducerFactory(store, isValid) {
  return function ejectReducer(name, mode = 'restart-on-remount') {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name),
      '(app/utils...) injectReducer: Expected `name` and `mode` to be a non empty string with a correct value'
    );

    invariant(
      isString(mode) && allowedModes.includes(mode),
      `(app/utils...) injectReducer: Expected \`mode\` to be one of: ${allowedModes.join(', ')}`
    );

    if (mode !== 'daemon') {
      Reflect.deleteProperty(store.injectedReducers, name);
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
