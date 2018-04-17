import { call, put, takeLatest } from 'redux-saga/effects';

import request, { fetchAll } from 'utils/request';
import { extractPraises } from 'utils/helpers';
import { apiKey, authorId } from '../../../secrets';
import { GET_BOOKS } from './constants';
import { setBooks, setPraise } from './actions';

export function* getBooks() {
  const titlesURL = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/${authorId}/titles?rows=0&api_key=${apiKey}`;
  try {
    const titlesResult = yield call(request, titlesURL);
    yield put(setBooks(titlesResult.data.titles));
    const praiseURLs = titlesResult.data.titles.map((title) => `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${title.isbn}/views/product-display?suppressLinks=true&api_key=${apiKey}`);
    const praisePromises = praiseURLs.map((url) => request(url));
    const praiseResults = yield call(fetchAll, praisePromises);
    for (let i = 0; i < praiseResults.length; i += 1) {
      yield put(setPraise(praiseResults[i].params.isbn, extractPraises(praiseResults[i].data.praises)));
    }
  } catch (err) {
    console.error(err);
  }
}

// Root saga
export default function* rootSaga() {
  yield [
    takeLatest(GET_BOOKS, getBooks),
  ];
}
