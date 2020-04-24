import { createReducer } from '../reducers';
import { Reducer } from '@reduxjs/toolkit';

describe('reducer', () => {
  it('should include router in reducer', () => {
    const reducer = createReducer({}) as Reducer<any, any>;
    const state = reducer({}, '');
    expect(state.router).toBeDefined();
  });

  it('should inject reducers', () => {
    const dummyReducer = (s = {}, a) => 'dummyResult';
    const reducer = createReducer({ test: dummyReducer } as any) as Reducer<
      any,
      any
    >;
    const state = reducer({}, '');
    expect(state.test).toBe('dummyResult');
  });
});
