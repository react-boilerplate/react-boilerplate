/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';

import configureStore from '../../store';
import getInjectors, {
  injectSagaFactory,
  ejectSagaFactory,
} from '../sagaInjectors';
import {
  DAEMON,
  ONCE_TILL_UNMOUNT,
  RESTART_ON_REMOUNT,
} from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectors', () => {
  let store;
  let injectSaga;
  let ejectSaga;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(expect.objectContaining({
        injectSaga: expect.any(Function),
        ejectSaga: expect.any(Function),
      }));
    });

    it('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => getInjectors(store)).toThrow();
    });
  });

  describe('ejectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectSaga = injectSagaFactory(store, true);
      ejectSaga = ejectSagaFactory(store, true);
    });

    it('should check a store if the second argument is falsy', () => {
      const eject = ejectSagaFactory({});

      expect(() => eject('test')).toThrow();
    });

    it('should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');
      injectSaga('test', testSaga);

      expect(() => ejectSaga('test')).not.toThrow();
    });

    it('should validate saga\'s key', () => {
      expect(() => ejectSaga('')).toThrow();
      expect(() => ejectSaga(1)).toThrow();
    });

    it('should validate saga\'s mode', () => {
      injectSaga('test1', testSaga);
      injectSaga('test2', testSaga);
      injectSaga('test3', testSaga);

      expect(() => ejectSaga('test', 'testMode')).toThrow();
      expect(() => ejectSaga('test', 1)).toThrow();
      expect(() => ejectSaga('test1', RESTART_ON_REMOUNT)).not.toThrow();
      expect(() => ejectSaga('test2', DAEMON)).not.toThrow();
      expect(() => ejectSaga('test3', ONCE_TILL_UNMOUNT)).not.toThrow();
    });

    it('should cancel a saga in a default mode', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel } };
      ejectSaga('test');

      expect(cancel).toHaveBeenCalled();
    });

    it('should not cancel a daemon saga', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel } };
      ejectSaga('test', DAEMON);

      expect(cancel).not.toHaveBeenCalled();
    });

    it('should ignore saga that was not previously injected', () => {
      expect(() => ejectSaga('test')).not.toThrow();
    });
  });

  describe('injectSaga helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectSaga = injectSagaFactory(store, true);
      ejectSaga = ejectSagaFactory(store, true);
    });

    it('should check a store if the second argument is falsy', () => {
      const inject = injectSagaFactory({});

      expect(() => inject('test', testSaga)).toThrow();
    });

    it('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => injectSaga('test', testSaga)).not.toThrow();
    });

    it('should validate a saga and saga\'s key', () => {
      expect(() => injectSaga('', testSaga)).toThrow();
      expect(() => injectSaga(1, testSaga)).toThrow();
      expect(() => injectSaga(1, 1)).toThrow();
    });

    it('should validate saga\'s mode', () => {
      expect(() => injectSaga('test', testSaga, null, 'testMode')).toThrow();
      expect(() => injectSaga('test', testSaga, null, 1)).toThrow();
      expect(() => injectSaga('test', testSaga, null, RESTART_ON_REMOUNT)).not.toThrow();
      expect(() => injectSaga('test', testSaga, null, DAEMON)).not.toThrow();
      expect(() => injectSaga('test', testSaga, null, ONCE_TILL_UNMOUNT)).not.toThrow();
    });

    it('should pass args to saga.run', () => {
      const args = {};
      store.runSaga = jest.fn();
      injectSaga('test', testSaga, args);

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args);
    });

    it('should not start daemon and once-till-unmount sagas if were started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', testSaga, null, DAEMON);
      injectSaga('test1', testSaga, null, DAEMON);
      injectSaga('test2', testSaga, null, ONCE_TILL_UNMOUNT);
      injectSaga('test2', testSaga, null, ONCE_TILL_UNMOUNT);

      expect(store.runSaga).toHaveBeenCalledTimes(2);
    });

    it('should start any saga that was not started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', testSaga);
      injectSaga('test2', testSaga, null, DAEMON);
      injectSaga('test3', testSaga, null, ONCE_TILL_UNMOUNT);

      expect(store.runSaga).toHaveBeenCalledTimes(3);
    });

    it('should restart a saga if different implementation for hot reloading', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { saga: testSaga, task: { cancel } };
      store.runSaga = jest.fn();

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', testSaga1);

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(store.runSaga).toHaveBeenCalledWith(testSaga1, undefined);
    });

    it('should throw if passed invalid saga', () => {
      let result = false;

      try {
        injectSaga('test', { testSaga });
      } catch (err) {
        result = err.name === 'Invariant Violation';
      }

      try {
        injectSaga('test', testSaga);
      } catch (err) {
        result = err.name === 'Invariant Violation';
      }

      expect(result).toBe(true);
    });
  });
});
