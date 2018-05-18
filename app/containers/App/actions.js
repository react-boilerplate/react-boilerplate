import {
  GET_BOOKS,
  SET_BOOKS,
  GET_ONE_BOOK,
  SET_ONE_BOOK,
  DELETE_BOOK,
  SET_PRAISE,
  SET_DESCRIPTION,
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

export const setPraise = (id, praise) => ({
  type: SET_PRAISE,
  id,
  praise,
});

export const setDescription = (id, description) => ({
  type: SET_DESCRIPTION,
  id,
  description,
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
