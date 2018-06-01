import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import keys from 'lodash/keys';

import request from 'utils/request';
import { GET_BOOKS, GET_ONE_BOOK, CREATE_OR_UPDATE_BOOK, DELETE_BOOK, GET_AUTHOR, GET_ARTICLES, GET_ONE_ARTICLE, CREATE_OR_UPDATE_ARTICLE, DELETE_ARTICLE, LOGIN, LOGOUT, WHO_AM_I } from './constants';
import { setBooks, setAuthor, setArticles, setOneBook, setOneArticle, setUser, setPostPutSuccess, setPostPutError } from './actions';

export function* getBooks() {
  try {
    const books = yield call(request, '/api/books', { credentials: 'same-origin' });
    yield put(setBooks(books));
  } catch (err) {
    console.error(err);
  }
}

export function* getOneBook({ bookId }) {
  try {
    const book = yield call(request, `/api/books/${bookId}`, { credentials: 'same-origin' });
    yield put(setOneBook(book[0]));
  } catch (err) {
    console.error(err);
  }
}

export function* createOrUpdateBook({ bookValues }) {
  try {
    const data = bookValues.toJS();
    const formData = new FormData();
    formData.append('file', data.img[0]);
    formData.append('name', data.img[0].name);
    if (data._id) formData.append('_id', data._id);
    const imgUploadResult = yield call(request, '/api/books/image', {
      credentials: 'same-origin',
      method: data._id ? 'put' : 'post',
      body: formData,
    });
    if (!imgUploadResult.ok) throw new Error('Image upload failed');
    const praise = keys(data)
      .filter((bookProp) => bookProp.match(/quoteBy/))
      .map((quote, index) => ({
        quote: data[`quote${index}`],
        quoteBy: data[`quoteBy${index}`],
      }))
      .filter(({ quote, quoteBy }) => quote && quoteBy);
    const { title, subtitle, isbn, description, publisher, url } = data;
    const body = JSON.stringify({
      title,
      subtitle,
      imgSrc: imgUploadResult.url,
      isbn,
      description,
      publisher,
      url,
      praise,
    });
    const reqUrl = `/api/books/${data._id || ''}`;
    const createdOrUpdated = yield call(request, reqUrl, {
      method: data._id ? 'put' : 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      credentials: 'same-origin',
    });
    if (!createdOrUpdated.ok && !createdOrUpdated._id) {
      throw new Error('Update book failed: Something went wrong in the database');
    } else {
      yield put(setPostPutSuccess(true));
      yield call(getOneBook, { bookId: data._id });
      yield call(getBooks);
    }
  } catch (err) {
    yield put(setPostPutError(err.message));
    console.error(err);
  }
}

export function* deleteBook({ bookId }) {
  try {
    yield call(request, `/api/books/${bookId}`, { method: 'delete', credentials: 'same-origin' });
    yield call(getBooks);
  } catch (err) {
    console.error(err);
  }
}

export function* getAuthor() {
  try {
    const authorData = yield call(request, '/api/authors', { credentials: 'same-origin' });
    yield put(setAuthor(authorData[0]));
  } catch (err) {
    console.error(err);
  }
}

export function* getArticles() {
  try {
    const articles = yield call(request, '/api/articles', { credentials: 'same-origin' });
    const enhancedArticles = articles
      .map((article) => ({ ...article, date: moment(article.date).format('L') }));
    yield put(setArticles(enhancedArticles));
  } catch (err) {
    console.error(err);
  }
}

export function* getOneArticle({ articleId }) {
  try {
    const article = yield call(request, `/api/articles/${articleId}`, { credentials: 'same-origin' });
    article[0].date = moment(article[0].date).format('L');
    yield put(setOneArticle(article[0]));
  } catch (err) {
    console.error(err);
  }
}

export function* createOrUpdateArticle({ articleValues }) {
  const data = articleValues.toJS();
  const body = JSON.stringify(data);
  const reqUrl = `/api/articles/${data._id || ''}`;
  try {
    const createdOrUpdated = yield call(request, reqUrl, {
      method: data._id ? 'put' : 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      credentials: 'same-origin',
    });
    if (!createdOrUpdated.ok && !createdOrUpdated._id) {
      throw new Error('Update article failed: Something went wrong in the database');
    } else {
      yield put(setPostPutSuccess(true));
      yield call(getArticles);
      yield call(getOneArticle, { articleId: data._id });
    }
  } catch (err) {
    yield put(setPostPutError(err.message));
    console.error(err);
  }
}

export function* deleteArticle({ articleId }) {
  try {
    yield call(request, `/api/articles/${articleId}`, { method: 'delete', credentials: 'same-origin' });
    yield call(getArticles);
  } catch (err) {
    console.error(err);
  }
}

export function* login({ username, password }) {
  try {
    const loginResult = yield call(request, '/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: 'same-origin',
    });
    if (loginResult.ok) yield put(setUser(true));
    else throw new Error('Login failed');
  } catch (err) {
    yield put(setPostPutError(err.message));
    console.error(err);
  }
}

export function* logout() {
  try {
    const logoutResult = yield call(request, '/api/logout', {
      credentials: 'same-origin',
    });
    if (logoutResult.ok) yield put(setUser(false));
    else throw new Error('Logout failed');
  } catch (err) {
    yield put(setPostPutError(err.message));
    console.error(err);
  }
}

export function* whoAmI() {
  try {
    const whoAmIResult = yield call(request, '/api/whoami', { credentials: 'same-origin' });
    if (whoAmIResult.ok) yield put(setUser(true));
  } catch (err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(GET_BOOKS, getBooks),
    takeLatest(GET_ONE_BOOK, getOneBook),
    takeLatest(CREATE_OR_UPDATE_BOOK, createOrUpdateBook),
    takeLatest(DELETE_BOOK, deleteBook),
    takeLatest(GET_AUTHOR, getAuthor),
    takeLatest(GET_ARTICLES, getArticles),
    takeLatest(GET_ONE_ARTICLE, getOneArticle),
    takeLatest(CREATE_OR_UPDATE_ARTICLE, createOrUpdateArticle),
    takeLatest(DELETE_ARTICLE, deleteArticle),
    takeLatest(LOGIN, login),
    takeLatest(LOGOUT, logout),
    takeLatest(WHO_AM_I, whoAmI),
  ];
}
