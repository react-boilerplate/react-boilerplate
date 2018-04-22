import {
  GET_BOOKS,
  SET_BOOKS,
  SET_PRAISE,
  SET_DESCRIPTION,
} from './constants';

export const getBooks = () => ({
  type: GET_BOOKS,
});

export const setBooks = (books) => ({
  type: SET_BOOKS,
  books,
});

export const setPraise = (isbn, praise) => ({
  type: SET_PRAISE,
  isbn,
  praise,
});

export const setDescription = (isbn, description) => ({
  type: SET_DESCRIPTION,
  isbn,
  description,
});
