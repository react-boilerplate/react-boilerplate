/**
 * Test route reducer
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import { routeReducer } from '../reducers';

describe('route reducer', () => {
  it('should return the initial state', () => {
    const initialState = { foo: 'bar' };
    expect(routeReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle the location_change action correctly', () => {
    const state = { foo: 'bar' };
    const payload = { baz: 'qux' };
    const action = { type: LOCATION_CHANGE, payload };

    expect(routeReducer(state, action)).toEqual(payload);
  });
});
