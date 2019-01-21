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

import {
  CREATE_MANUFACTURER_PROCESSING,
  CREATE_MANUFACTURER_STATUS,
  VIEW_ALL_MANUFACTURER_PROCESSING,
  VIEW_ALL_MANUFACTURER_STATUS,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  isFetchingManufacturersList: false,
  manufacturersList: [],
  isCreatingManufacturer: false,
  createManufacturerSuccess: false,
});

function manufacturerReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MANUFACTURER_PROCESSING:
      return state.set('isCreatingManufacturer', action.payload);
    case CREATE_MANUFACTURER_STATUS:
      return state.set('createManufacturerSuccess', action.payload);
    case VIEW_ALL_MANUFACTURER_PROCESSING:
      return state.set('isFetchingManufacturersList', action.payload);
    case VIEW_ALL_MANUFACTURER_STATUS:
      return state.set('manufacturersList', action.payload);
    default:
      return state;
  }
}

export default manufacturerReducer;
