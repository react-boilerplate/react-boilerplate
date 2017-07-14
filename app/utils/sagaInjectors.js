import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';
import conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';
import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key) => invariant(
  isString(key) && !isEmpty(key),
  '(app/utils...) injectSaga: Expected `key` to be a non empty string'
);

const checkDescriptor = (descriptor) => {
  const shape = {
    saga: isFunction,
    mode: (mode) => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor'
  );
};

export function injectSagaFactory(store, isValid) {
  return function injectSaga(key, { saga, mode = RESTART_ON_REMOUNT } = {}, args) {
    if (!isValid) checkStore(store);

    checkKey(key);
    checkDescriptor({ saga, mode });

    let hasSaga = Reflect.has(store.injectedSagas, key);

    // enable hot reloading of daemon and once-till-unmount sagas
    if (hasSaga && store.injectedSagas[key].saga !== saga) {
      store.injectedSagas[key].task.cancel();
      hasSaga = false;
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      store.injectedSagas[key] = { saga, task: store.runSaga(saga, args), mode }; // eslint-disable-line no-param-reassign
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(key) {
    if (!isValid) checkStore(store);

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
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
