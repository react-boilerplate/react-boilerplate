import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';

import checkStore from './checkStore';

const allowedModes = ['restart-on-remount', 'daemon', 'once-till-unmount'];
const checkMode = (mode) => invariant(
  isString(mode) && allowedModes.includes(mode),
  `(app/utils...) injectSaga: Expected \`mode\` to be one of: ${allowedModes.join(', ')}`
);

export function injectSagaFactory(store, isValid) {
  return function injectSaga(name, saga, args, mode = 'restart-on-remount') {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(saga),
      '(app/utils...) injectSaga: Expected `saga` to be a generator function'
    );

    checkMode(mode);

    let hasSaga = Reflect.has(store.injectedSagas, name);

    // enable hot reloading of daemon and once-till-unmount sagas
    if (hasSaga && store.injectedSagas[name].saga !== saga) {
      store.injectedSagas[name].task.cancel();
      hasSaga = false;
    }

    if (!hasSaga || (hasSaga && mode !== 'daemon' && mode !== 'once-till-unmount')) {
      store.injectedSagas[name] = { saga, task: store.runSaga(saga, args) }; // eslint-disable-line no-param-reassign
    }
  };
}

export function ejectSagaFactory(store, isValid) {
  return function ejectSaga(name, mode = 'restart-on-remount') {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name),
      '(app/utils...) injectSaga: Expected `name` to be a non empty string'
    );

    checkMode(mode);

    if (Reflect.has(store.injectedSagas, name)) {
      const { task } = store.injectedSagas[name];
      if (task && mode !== 'daemon') {
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
