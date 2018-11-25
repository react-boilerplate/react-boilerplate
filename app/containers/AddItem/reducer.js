import { fromJS } from 'immutable';
import { ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR } from './constants';

export const initialState = fromJS({
  item: '',
  success: false,
  successResponse: 0,
  error: false,
  errorResponse: '',
});

function addItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return state.set('item', action.item);
    case ADD_ITEM_SUCCESS:
      return state.set('success', true).set('successResponse', action.success);
    case ADD_ITEM_ERROR:
      return state.set('error', true).set('errorResponse', action.error);
    default:
      return state;
  }
}

export default addItemReducer;
