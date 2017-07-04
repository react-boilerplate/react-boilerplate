/**
 * Test injectors
 */

import { memoryHistory } from 'react-router';
import { fromJS } from 'immutable';
import identity from 'lodash/identity';

import configureStore from '../../store';

import getInjectors, {
  injectReducerFactory,
  ejectReducerFactory,
} from '../reducerInjectors';

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
    });

    it('should check a store if the second argument is falsy', () => {
      const ejectReducer = ejectReducerFactory({});

      expect(() => ejectReducer('test')).toThrow();
    });

    it('should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');
      const ejectReducer = ejectReducerFactory(store, true);

      expect(() => ejectReducer('test')).not.toThrow();
    });

    it('should validate reducer\'s name', () => {
      const ejectReducer = ejectReducerFactory(store, true);

      expect(() => ejectReducer('')).toThrow();
      expect(() => ejectReducer(1)).toThrow();
    });

    it('should validate reducer\'s mode', () => {
      const ejectReducer = ejectReducerFactory(store, true);

      expect(() => ejectReducer('test', 'testMode')).toThrow();
      expect(() => ejectReducer('test', 1)).toThrow();
      expect(() => ejectReducer('test', 'restart-on-remount')).not.toThrow();
      expect(() => ejectReducer('test', 'daemon')).not.toThrow();
    });

    it('should remove a reducer from a store in a default mode', () => {
      const ejectReducer = ejectReducerFactory(store, true);
      const injectReducer = injectReducerFactory(store, true);
      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      ejectReducer('test');

      expect(store.injectedReducers).toEqual({});
      expect(store.replaceReducer).toHaveBeenCalled();
    });

    it('should not remove a daemon reducer', () => {
      const ejectReducer = ejectReducerFactory(store, true);
      const injectReducer = injectReducerFactory(store, true);
      injectReducer('test', reducer);
      store.replaceReducer = jest.fn();
      ejectReducer('test', 'daemon');

      expect(store.injectedReducers).toEqual({ test: reducer });
      expect(store.replaceReducer).not.toHaveBeenCalled();
    });
  });

  describe('injectReducer helper', () => {
    beforeEach(() => {
      store = configureStore({}, memoryHistory);
    });

    it('should check a store if the second argument is falsy', () => {
      const injectReducer = injectReducerFactory({});

      expect(() => injectReducer('test', reducer)).toThrow();
    });

    it('it should not check a store if the second argument is true', () => {
      Reflect.deleteProperty(store, 'dispatch');
      const injectReducer = injectReducerFactory(store, true);

      expect(() => injectReducer('test', reducer)).not.toThrow();
    });

    it('should validate a reducer and reducer\'s name', () => {
      const injectReducer = injectReducerFactory(store, true);

      expect(() => injectReducer('', reducer)).toThrow();
      expect(() => injectReducer(1, reducer)).toThrow();
      expect(() => injectReducer(1, 1)).toThrow();
    });

    it('given a store, it should provide a function to inject a reducer', () => {
      const injectReducer = injectReducerFactory(store);

      injectReducer('test', reducer);

      const actual = store.getState().get('test');
      const expected = initialState;

      expect(actual.toJS()).toEqual(expected.toJS());
    });

    it('should not assign reducer if already existing', () => {
      const injectReducer = injectReducerFactory(store);

      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', reducer);

      expect(store.replaceReducer).toHaveBeenCalledTimes(1);
    });

    it('should assign reducer if different implementation for hot reloading', () => {
      const injectReducer = injectReducerFactory(store);

      store.replaceReducer = jest.fn();
      injectReducer('test', reducer);
      injectReducer('test', identity);

      expect(store.replaceReducer).toHaveBeenCalledTimes(2);
    });
  });
});
