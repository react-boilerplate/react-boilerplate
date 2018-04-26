import { fromJS } from 'immutable';

import {
  GET_BOOKS,
  SET_BOOKS,
  SET_PRAISE,
  SET_DESCRIPTION,
  GET_AUTHOR,
  SET_AUTHOR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  books: [],
  praise: {},
  description: {},
  author: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return state;
    case SET_BOOKS:
      return state.set('books', fromJS(action.books));
    case SET_PRAISE:
      return state.setIn(['praise', action.isbn], action.praise);
    case SET_DESCRIPTION:
      return state.setIn(['description', action.isbn], action.description);
    case GET_AUTHOR:
      return state;
    case SET_AUTHOR:
      return state.set('author', fromJS(action.author));
    default:
      return state;
  }
}

export default reducer;
