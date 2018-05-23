import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import keys from 'lodash/keys';

import request from 'utils/request';
import { GET_BOOKS, GET_ONE_BOOK, CREATE_OR_UPDATE_BOOK, DELETE_BOOK, GET_AUTHOR, GET_ARTICLES, GET_ONE_ARTICLE, CREATE_OR_UPDATE_ARTICLE, DELETE_ARTICLE, LOGIN } from './constants';
import { setBooks, setAuthor, setArticles, setOneBook, setOneArticle, setUser } from './actions';

export function* getBooks() {
  try {
    const books = yield call(request, '/api/books');
    yield put(setBooks(books));
  } catch (err) {
    console.error(err);
  }
}

export function* getOneBook({ bookId }) {
  try {
    const book = yield call(request, `/api/books/${bookId}`);
    yield put(setOneBook(book[0]));
  } catch (err) {
    console.error(err);
  }
}

export function* createOrUpdateBook({ bookValues }) {
  try {
    const data = bookValues.toJS();
    const praise = keys(data)
      .filter((bookProp) => bookProp.match(/quoteBy/))
      .map((quote, index) => ({
        quote: data[`quote${index}`],
        quoteBy: data[`quoteBy${index}`],
      }))
      .filter(({ quote, quoteBy }) => quote && quoteBy);
    const { title, subtitle, imgSrc, isbn, description, publisher, url } = data;
    const body = JSON.stringify({
      title,
      subtitle,
      imgSrc,
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
    });
    if (!createdOrUpdated.ok && !createdOrUpdated._id) {
      throw new Error('Update book failed: Something went wrong in the database');
    } else {
      yield call(getOneBook, { bookId: data._id });
      yield call(getBooks);
    }
  } catch (err) {
    console.error(err);
  }
}

export function* deleteBook({ bookId }) {
  try {
    yield call(request, `/api/books/${bookId}`, { method: 'delete' });
    yield call(getBooks);
  } catch (err) {
    console.error(err);
  }
}

export function* getAuthor() {
  try {
    const authorData = yield call(request, '/api/authors');
    yield put(setAuthor(authorData[0]));
  } catch (err) {
    console.error(err);
  }
}

export function* getArticles() {
  try {
    const articles = yield call(request, '/api/articles');
    const enhancedArticles = articles
      .map((article) => ({ ...article, date: moment(article.date).format('L') }));
    yield put(setArticles(enhancedArticles));
  } catch (err) {
    console.error(err);
  }
}

export function* getOneArticle({ articleId }) {
  try {
    const article = yield call(request, `/api/articles/${articleId}`);
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
  const createdOrUpdated = yield call(request, reqUrl, {
    method: data._id ? 'put' : 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  if (!createdOrUpdated.ok && !createdOrUpdated._id) {
    throw new Error('Update article failed: Something went wrong in the database');
  } else {
    yield call(getArticles);
    yield call(getOneArticle, { articleId: data._id });
  }
}

export function* deleteArticle({ articleId }) {
  try {
    yield call(request, `/api/articles/${articleId}`, { method: 'delete' });
    yield call(getArticles);
  } catch (err) {
    console.error(err);
  }
}

export function* login({ username, password }) {
  try {
    console.log(username, password);
    yield call(request, '/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    yield put(setUser(true));
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
  ];
}
