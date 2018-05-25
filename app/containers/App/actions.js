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
  GET_ONE_ARTICLE,
  SET_ONE_ARTICLE,
  SET_ARTICLES,
  CREATE_OR_UPDATE_ARTICLE,
  DELETE_ARTICLE,
  CLEAR_ONE_BOOK,
  CLEAR_ONE_ARTICLE,
  LOGIN,
  WHO_AM_I,
  LOGOUT,
  SET_USER,
  SET_POST_PUT_SUCCESS,
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

export const clearOneBook = () => ({
  type: CLEAR_ONE_BOOK,
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

export const getOneArticle = (articleId) => ({
  type: GET_ONE_ARTICLE,
  articleId,
});

export const setOneArticle = (article) => ({
  type: SET_ONE_ARTICLE,
  article,
});

export const clearOneArticle = () => ({
  type: CLEAR_ONE_ARTICLE,
});

export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles,
});

export const createOrUpdateArticle = (articleValues) => ({
  type: CREATE_OR_UPDATE_ARTICLE,
  articleValues,
});

export const deleteArticle = (articleId) => ({
  type: DELETE_ARTICLE,
  articleId,
});

export const login = (username, password) => ({
  type: LOGIN,
  username,
  password,
});

export const whoAmI = () => ({
  type: WHO_AM_I,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUser = (bool) => ({
  type: SET_USER,
  bool,
});

export const setPostPutSuccess = (bool) => ({
  type: SET_POST_PUT_SUCCESS,
  bool,
});
