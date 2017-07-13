/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { fromJS } from 'immutable';
import identity from 'lodash/identity';

import configureStore from '../../store';

import getInjectors, {
  injectReducerFactory,
  ejectReducerFactory,
} from '../reducerInjectors';
import {
  DAEMON,
  RESTART_ON_REMOUNT,
} from '../constants';

// Fixtures

const initialState = fromJS({ reduced: 'soon' });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return state.set('reduced', action.payload);
    default:
      return state;
  }
};

describe('reducer injectors', () => {
  let store;
  let injectReducer;
  let ejectReducer;

  describe('getInjectors', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('should return injectors', () => {
      expect(getInjectors(store)).toEqual(expect.objectContaining({
        injectReducer: expect.any(Function),
        ejectReducer: expect.any(Function),
      }));
    });

    it('should throw if passed invalid store shape', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => getInjectors(store)).toThrow();
    });
  });

  describe('ejectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectReducer = injectReducerFactory(store, true);
      ejectReducer = ejectReducerFactory(store, true);
    });

    it('should check a store if the second argument is falsy', () => {
      const eject = ejectReducerFactory({});

      expect(() => eject('test')).toThrow();
    });

    it('should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => ejectReducer('test')).not.toThrow();
    });

    it('should validate reducer\'s key', () => {
      expect(() => ejectReducer('')).toThrow();
      expect(() => ejectReducer(1)).toThrow();
    });

    it('should validate reducer\'s mode', () => {
      expect(() => ejectReducer('test', 'testMode')).toThrow();
      expect(() => ejectReducer('test', 1)).toThrow();
      expect(() => ejectReducer('test', RESTART_ON_REMOUNT)).not.toThrow();
      expect(() => ejectReducer('test', DAEMON)).not.toThrow();
    });

    it('should not remove a reducer from a store in a default mode', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      ejectReducer('test');

      expect(store.injectedReducers).toEqual({ test: reducer });
      expect(store.replaceReducer).toHaveBeenCalled();
    });

    it('should not remove a daemon reducer', () => {
      injectReducer('test', reducer);
      store.replaceReducer = jest.fn();
      ejectReducer('test', DAEMON);

      expect(store.injectedReducers).toEqual({ test: reducer });
      expect(store.replaceReducer).not.toHaveBeenCalled();
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
      injectReducer = injectReducerFactory(store, true);
      ejectReducer = ejectReducerFactory(store, true);
    });

    it('should check a store if the second argument is falsy', () => {
      const inject = injectReducerFactory({});

      expect(() => inject('test', reducer)).toThrow();
    });

    it('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');

      expect(() => injectReducer('test', reducer)).not.toThrow();
    });

    it('should validate a reducer and reducer\'s key', () => {
      expect(() => injectReducer('', reducer)).toThrow();
      expect(() => injectReducer(1, reducer)).toThrow();
      expect(() => injectReducer(1, 1)).toThrow();
    });

    it('given a store, it should provide a function to inject a reducer', () => {
      injectReducer('test', reducer);

      const actual = store.getState().get('test');
      const expected = initialState;

      expect(actual.toJS()).toEqual(expected.toJS());
    });

    it('should not assign reducer if already existing', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });

    it('should assign reducer if different implementation for hot reloading', () => {
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', identity);

      expect(store.replaceReducer).toHaveBeenCalledTimes(2);
    });
  });
});
