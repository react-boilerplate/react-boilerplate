import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';

import checkStore from './checkStore';
import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];
const checkMode = (mode) => invariant(
  isString(mode) && allowedModes.includes(mode),
  `(app/utils...) injectSaga: Expected \`mode\` to be one of: ${allowedModes.join(', ')}`
);

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, saga, args, mode = RESTART_ON_REMOUNT) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(saga),
      '(app/utils...) injectSaga: Expected `saga` to be a generator function'
    );

    checkMode(mode);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    // enable hot reloading of daemon and once-till-unmount sagas
    if (hasSaga && store.injectedSagas[key].saga !== saga) {
      store.injectedSagas[key].task.cancel();
      hasSaga = false;
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      store.injectedSagas[key] = { saga, task: store.runSaga(saga, args) }; // eslint-disable-line no-param-reassign
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key, mode = RESTART_ON_REMOUNT) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key),
      '(app/utils...) injectSaga: Expected `key` to be a non empty string'
    );

    checkMode(mode);

    if (Reflect.has(store.injectedSagas, key)) {
      const { task } = store.injectedSagas[key];
      if (task && mode !== DAEMON) {
        task.cancel();
      }
    }
  };
}

export default function getInjectors(store) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
