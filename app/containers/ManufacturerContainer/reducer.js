/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CREATE_MANUFACTURER, VIEW_ALL_MANUFACTURER } from './constants';

// The initial state of the App
export const initialState = fromJS({
  manufacturerName: '',
  manufacturersList: [],
  isCreatingManufacturer: false,
});

function manufacturerReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MANUFACTURER:
      return state.set('manufacturerName', action.data);
    case VIEW_ALL_MANUFACTURER:
      return state.set('manufacturersList', action.data);
    default:
      return state;
  }
}

export default manufacturerReducer;
