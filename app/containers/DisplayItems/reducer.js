import { fromJS } from 'immutable';
import { GET_ITEMS_SUCCESS, GET_ITEMS_ERROR } from './constants';

export const initialState = fromJS({
  items: [],
  success: false,
  error: false,
});

function displayItemsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
      return state.set('success', true).set('items', action.items);
    case GET_ITEMS_ERROR:
      return state.set('error', true);
    default:
      return state;
  }
}

export default displayItemsReducer;
