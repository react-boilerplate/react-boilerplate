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

export const getBooks = () => ({
  type: GET_BOOKS,
});

export const setBooks = (books) => ({
  type: SET_BOOKS,
  books,
});

export const getOneBook = (bookId) => ({
  type: GET_ONE_BOOK,
  bookId,
});

export const setOneBook = (book) => ({
  type: SET_ONE_BOOK,
  book,
});

export const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  bookId,
});

export const createOrUpdateBook = (bookValues) => ({
  type: CREATE_OR_UPDATE_BOOK,
  bookValues,
});

export const addPraise = () => ({
  type: ADD_PRAISE,
});

export const getAuthor = () => ({
  type: GET_AUTHOR,
});

export const setAuthor = (author) => ({
  type: SET_AUTHOR,
  author,
});

export const getArticles = () => ({
  type: GET_ARTICLES,
});

export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles,
});

export const deleteArticle = (articleId) => ({
  type: DELETE_ARTICLE,
  articleId,
});
