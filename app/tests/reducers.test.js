/**
 * Test route reducer
 */

import { LOCATION_CHANGE } from 'react-router-redux';
import { location } from '../reducers';

describe('route reducer', () => {
  it('should return the initial state', () => {
    const initialState = { foo: 'bar' };
    expect(location(initialState, {})).toEqual(initialState);
  });

  it('should handle the location_change action correctly', () => {
    const state = { foo: 'bar' };
    const payload = { baz: 'qux' };
    const action = { type: LOCATION_CHANGE, payload };

    expect(location(state, action)).toEqual(payload);
  });
});
