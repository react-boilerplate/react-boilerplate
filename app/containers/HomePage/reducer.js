import { fromJS } from 'immutable';

import {
  GET_BOOKS,
  SET_BOOKS,
  SET_PRAISE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  books: [],
  praise: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return state;
    case SET_BOOKS:
      return state.set('books', fromJS(action.books));
    case SET_PRAISE:
      return state.setIn(['praise', action.isbn], action.praise);
    default:
      return state;
  }
}

export default reducer;
