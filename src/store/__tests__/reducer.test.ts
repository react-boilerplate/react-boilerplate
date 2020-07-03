import { createReducer } from '../reducers';
import { Reducer } from '@reduxjs/toolkit';

describe('reducer', () => {
  it('should inject reducers', () => {
    const dummyReducer = (s = {}, a) => 'dummyResult';
    const reducer = createReducer({ test: dummyReducer } as any) as Reducer<
      any,
      any
    >;
    const state = reducer({}, '');
    expect(state.test).toBe('dummyResult');
  });

  it('should return identity reducers when empty', () => {
    const reducer = createReducer() as Reducer<any, any>;
    const state = { a: 1 };
    const newState = reducer(state, '');
    expect(newState).toBe(state);
  });
});
