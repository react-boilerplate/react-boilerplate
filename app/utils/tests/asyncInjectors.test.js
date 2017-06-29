/**
 * Test async injectors
 */

import { memoryHistory } from 'react-router';
import { put } from 'redux-saga/effects';

import configureStore from '../../store';

import {
  injectAsyncReducer,
  injectAsyncSagas,
  getAsyncInjectors,
} from '../asyncInjectors';

// Fixtures

const initialState = { reduced: 'soon' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return { ...state, reduced: action.payload };
    default:
      return state;
  }
};

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

const sagas = [testSaga];

describe('asyncInjectors', () => {
  let store;

  describe('getAsyncInjectors', () => {
    beforeAll(() => {
      store = configureStore({}, memoryHistory);
    });

    it('given a store, should return all async injectors', () => {
      const { injectReducer, injectSagas } = getAsyncInjectors(store);

      injectReducer('test', reducer);
      injectSagas(sagas);

      const actual = store.getState().test;
      const expected = { ...initialState, reduced: 'yup' };

      expect(actual).toEqual(expected);
    });

    it('should throw if passed invalid store shape', () => {
      let result = false;

      Reflect.deleteProperty(store, 'dispatch');

      try {
        getAsyncInjectors(store);
      } catch (err) {
        result = err.name === 'Invariant Violation';
      }

      expect(result).toBe(true);
    });
  });

  describe('helpers', () => {
    beforeAll(() => {
      store = configureStore({}, memoryHistory);
    });

    describe('injectAsyncReducer', () => {
      it('given a store, it should provide a function to inject a reducer', () => {
        const injectReducer = injectAsyncReducer(store);

        injectReducer('test', reducer);

        const actual = store.getState().test;
        const expected = initialState;

        expect(actual).toEqual(expected);
      });

      it('should not assign reducer if already existing', () => {
        const injectReducer = injectAsyncReducer(store);

        injectReducer('test', reducer);
        injectReducer('test', () => {});

        expect(store.asyncReducers.test.toString()).toEqual(reducer.toString());
      });

      it('should throw if passed invalid name', () => {
        let result = false;

        const injectReducer = injectAsyncReducer(store);

        try {
          injectReducer('', reducer);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectReducer(999, reducer);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toBe(true);
      });

      it('should throw if passed invalid reducer', () => {
        let result = false;

        const injectReducer = injectAsyncReducer(store);

        try {
          injectReducer('bad', 'nope');
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectReducer('coolio', 12345);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toBe(true);
      });
    });

    describe('injectAsyncSagas', () => {
      it('given a store, it should provide a function to inject a saga', () => {
        const injectSagas = injectAsyncSagas(store);

        injectSagas(sagas);

        const actual = store.getState().test;
        const expected = { ...initialState, reduced: 'yup' };

        expect(actual).toEqual(expected);
      });

      it('should throw if passed invalid saga', () => {
        let result = false;

        const injectSagas = injectAsyncSagas(store);

        try {
          injectSagas({ testSaga });
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        try {
          injectSagas(testSaga);
        } catch (err) {
          result = err.name === 'Invariant Violation';
        }

        expect(result).toBe(true);
      });
    });
  });
});
