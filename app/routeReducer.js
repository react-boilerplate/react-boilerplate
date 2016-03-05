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
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
    });
  }

  return state;
}

export default routeReducer;

