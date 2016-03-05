/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// Initial state
const initialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * merge route state into immutable
 *
 * @param {object} state = initialState
 * @param {object} action
 * @returns {object}
 */
export function routeReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

export default routeReducer;

