/**
 * Test async injectors
 */

import expect from 'expect';
import configureStore from 'store.js';
import { memoryHistory } from 'react-router';
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import {
  injectAsyncReducer,
  injectAsyncSagas,
  getAsyncInjectors,
} from 'utils/asyncInjectors';

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

const sagas = [
  function* testSaga() {
    yield put({ type: 'TEST', payload: 'yup' });
  },
];

describe('asyncInjectors', () => {
  let store;

  describe('getAsyncInjectors', () => {
    before(() => {
      store = configureStore({}, memoryHistory);
    });

    it('given a store, should return all async injectors', () => {
      const { injectReducer, injectSagas } = getAsyncInjectors(store);

      injectReducer('test', reducer);
      injectSagas(sagas);

      const actual = store.getState().get('test');
      const expected = initialState.merge({ reduced: 'yup' });

      expect(actual.toJS()).toEqual(expected.toJS());
    });
  });

  describe('helpers', () => {
    before(() => {
      store = configureStore({}, memoryHistory);
    });

    describe('injectAsyncReducer', () => {
      it('given a store, it should provide a function to inject a reducer', () => {
        const injectReducer = injectAsyncReducer(store);

        injectReducer('test', reducer);

        const actual = store.getState().get('test');
        const expected = initialState;

        expect(actual.toJS()).toEqual(expected.toJS());
      });
    });

    describe('injectAsyncSagas', () => {
      it('given a store, it should provide a function to inject a saga', () => {
        const injectSagas = injectAsyncSagas(store);

        injectSagas(sagas);

        const actual = store.getState().get('test');
        const expected = initialState.merge({ reduced: 'yup' });

        expect(actual.toJS()).toEqual(expected.toJS());
      });
    });
  });
});
