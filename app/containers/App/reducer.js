import { fromJS } from 'immutable';

import {
  GET_BOOKS,
  SET_BOOKS,
  GET_ONE_BOOK,
  SET_ONE_BOOK,
  DELETE_BOOK,
  CREATE_OR_UPDATE_BOOK,
  ADD_PRAISE,
  GET_AUTHOR,
  SET_AUTHOR,
  GET_ARTICLES,
  SET_ARTICLES,
  DELETE_ARTICLE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  books: [],
  selectedBook: {
    title: '',
    subtitle: '',
    imgSrc: '',
    isbn: 0,
    description: '',
    publisher: '',
    url: '',
    praise: [
      { _id: `${Date.now()}-q1`, quote: '', quoteBy: '' },
      { _id: `${Date.now()}-q2`, quote: '', quoteBy: '' },
    ],
  },
  author: {},
  articles: [],
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return state;
    case SET_BOOKS:
      return state.set('books', fromJS(action.books));
    case GET_ONE_BOOK:
      return state;
    case SET_ONE_BOOK:
      return state.set('selectedBook', fromJS(action.book));
    case DELETE_BOOK:
      return state;
    case CREATE_OR_UPDATE_BOOK:
      return state;
    case ADD_PRAISE:
      return state.setIn(['selectedBook', 'praise'], state.getIn(['selectedBook', 'praise']).push(fromJS({
        _id: `${Date.now()}`,
        quote: '',
        quoteBy: '',
      })));
    case GET_AUTHOR:
      return state;
    case SET_AUTHOR:
      return state.set('author', fromJS(action.author));
    case GET_ARTICLES:
      return state;
    case SET_ARTICLES:
      return state.set('articles', fromJS(action.articles));
    case DELETE_ARTICLE:
      return state;
    default:
      return state;
  }
}

export default reducer;
