import { fromJS } from 'immutable';
import { ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR } from './constants';

export const initialState = fromJS({
  item: '',
  success: false,
  error: false,
});

function addItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return state
        .set('item', action.item)
        .set('success', false)
        .set('error', false);
    case ADD_ITEM_SUCCESS:
      return state.set('success', action.success).set('item', '');
    case ADD_ITEM_ERROR:
      return state.set('error', action.error).set('item', '');
    default:
      return state;
  }
}

export default addItemReducer;
