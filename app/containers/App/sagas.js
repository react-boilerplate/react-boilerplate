import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';

import request from 'utils/request';
import { GET_BOOKS, GET_AUTHOR, GET_ARTICLES } from './constants';
import { setBooks, setAuthor, setArticles } from './actions';

export function* getBooks() {
  try {
    const books = yield call(request, '/api/books');
    yield put(setBooks(books));
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

export default function* rootSaga() {
  yield [
    takeLatest(GET_BOOKS, getBooks),
    takeLatest(GET_AUTHOR, getAuthor),
    takeLatest(GET_ARTICLES, getArticles),
  ];
}
