import { fromJS } from 'immutable';
import { ADD_ITEM } from './constants';

export const initialState = fromJS({
  item: '',
});

function addItemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return state.set('item', action.item);
    default:
      return state;
  }
}

export default addItemReducer;
