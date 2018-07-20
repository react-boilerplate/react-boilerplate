/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';

import configureStore from '../../configureStore';
import getInjectors, {
  injectSagaFactory,
  ejectSagaFactory,
} from '../sagaInjectors';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from '../constants';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectors', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let store;
  let injectSaga;
  let ejectSaga;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(
        expect.objectContaining({
          injectSaga: expect.any(Function),
          ejectSaga: expect.any(Function),
        }),
      );
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
      injectSaga('test', { saga: testSaga });

      expect(() => ejectSaga('test')).not.toThrow();
    });

    it("should validate saga's key", () => {
      expect(() => ejectSaga('')).toThrow();
      expect(() => ejectSaga(1)).toThrow();
    });

    it('should cancel a saga in a default mode', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel } };
      ejectSaga('test');

      expect(cancel).toHaveBeenCalled();
    });

    it('should not cancel a daemon saga', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { task: { cancel }, mode: DAEMON };
      ejectSaga('test');

      expect(cancel).not.toHaveBeenCalled();
    });

    it('should ignore saga that was not previously injected', () => {
      expect(() => ejectSaga('test')).not.toThrow();
    });

    it("should remove non daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT });
      injectSaga('test1', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      ejectSaga('test');
      ejectSaga('test1');

      expect(store.injectedSagas.test).toBe('done');
      expect(store.injectedSagas.test1).toBe('done');
      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should not remove daemon saga's descriptor in production", () => {
      process.env.NODE_ENV = 'production';
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it("should not remove daemon saga's descriptor in development", () => {
      injectSaga('test', { saga: testSaga, mode: DAEMON });
      ejectSaga('test');

      expect(store.injectedSagas.test.saga).toBe(testSaga);
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

      expect(() => injectSaga('test', { saga: testSaga })).not.toThrow();
    });

    it("should validate saga's key", () => {
      expect(() => injectSaga('', { saga: testSaga })).toThrow();
      expect(() => injectSaga(1, { saga: testSaga })).toThrow();
    });

    it("should validate saga's descriptor", () => {
      expect(() => injectSaga('test')).toThrow();
      expect(() => injectSaga('test', { saga: 1 })).toThrow();
      expect(() =>
        injectSaga('test', { saga: testSaga, mode: 'testMode' }),
      ).toThrow();
      expect(() => injectSaga('test', { saga: testSaga, mode: 1 })).toThrow();
      expect(() =>
        injectSaga('test', { saga: testSaga, mode: RESTART_ON_REMOUNT }),
      ).not.toThrow();
      expect(() =>
        injectSaga('test', { saga: testSaga, mode: DAEMON }),
      ).not.toThrow();
      expect(() =>
        injectSaga('test', { saga: testSaga, mode: ONCE_TILL_UNMOUNT }),
      ).not.toThrow();
    });

    it('should pass args to saga.run', () => {
      const args = {};
      store.runSaga = jest.fn();
      injectSaga('test', { saga: testSaga }, args);

      expect(store.runSaga).toHaveBeenCalledWith(testSaga, args);
    });

    it('should not start daemon and once-till-unmount sagas if were started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga, mode: DAEMON });
      injectSaga('test1', { saga: testSaga, mode: DAEMON });
      injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });
      injectSaga('test2', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(2);
    });

    it('should start any saga that was not started before', () => {
      store.runSaga = jest.fn();

      injectSaga('test1', { saga: testSaga });
      injectSaga('test2', { saga: testSaga, mode: DAEMON });
      injectSaga('test3', { saga: testSaga, mode: ONCE_TILL_UNMOUNT });

      expect(store.runSaga).toHaveBeenCalledTimes(3);
    });

    it('should restart a saga if different implementation for hot reloading', () => {
      const cancel = jest.fn();
      store.injectedSagas.test = { saga: testSaga, task: { cancel } };
      store.runSaga = jest.fn();

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', { saga: testSaga1 });

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(store.runSaga).toHaveBeenCalledWith(testSaga1, undefined);
    });

    it('should not cancel saga if different implementation in production', () => {
      process.env.NODE_ENV = 'production';
      const cancel = jest.fn();
      store.injectedSagas.test = {
        saga: testSaga,
        task: { cancel },
        mode: RESTART_ON_REMOUNT,
      };

      function* testSaga1() {
        yield put({ type: 'TEST', payload: 'yup' });
      }

      injectSaga('test', { saga: testSaga1, mode: DAEMON });

      expect(cancel).toHaveBeenCalledTimes(0);
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should save an entire descriptor in the saga registry', () => {
      injectSaga('test', { saga: testSaga, foo: 'bar' });
      expect(store.injectedSagas.test.foo).toBe('bar');
    });
  });
});
