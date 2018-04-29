import { call, put, select, takeLatest } from 'redux-saga/effects';

import request, { fetchAll } from 'utils/request';
import { extractPraises, parsePraises, combineBookData, removeSymbols, flattenAuthor } from 'utils/helpers';
import { GET_BOOKS, GET_AUTHOR, GET_ARTICLES } from './constants';
import { setBooks, setPraise, setDescription, setAuthor, setArticles } from './actions';
import { selectPraise, selectDescription } from './selectors';
import articles from '../ArticlesPage/articles';

import { apiKey, authorId/* , nyTimesApiKey */ } from '../../../secrets';

export function* getBooks() {
  const titlesURL = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/${authorId}/titles?rows=0&api_key=${apiKey}`;
  try {
    const titlesResult = yield call(request, titlesURL);
    const viewURLs = titlesResult.data.titles.map((title) => `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/titles/${title.isbn}/views/product-display?suppressLinks=true&api_key=${apiKey}`);
    const viewPromises = viewURLs.map((url) => request(url));
    const viewResults = yield call(fetchAll, viewPromises);
    for (let i = 0; i < viewResults.length; i += 1) {
      yield put(setDescription(viewResults[i].params.isbn, removeSymbols(viewResults[i].data.frontlistiestTitle.aboutTheBook)));
      yield put(setPraise(viewResults[i].params.isbn, parsePraises(extractPraises(viewResults[i].data.praises))));
    }
    const praiseInState = yield select(selectPraise());
    const descriptionInState = yield select(selectDescription());
    const booksAndPraise = combineBookData(titlesResult.data.titles, praiseInState, descriptionInState);
    yield put(setBooks(booksAndPraise));
  } catch (err) {
    console.error(err);
  }
}

export function* getAuthor() {
  const authorURL = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/authors/views/list-display?authorId=${authorId}&api_key=${apiKey}`;
  try {
    const authorData = yield call(request, authorURL);
    yield put(setAuthor(flattenAuthor(authorData.data.authors[0])));
  } catch (err) {
    console.error(err);
  }
}

export function* getArticles() {
  // const articlesURL = `https://cors-anywhere.herokuapp.com/https://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nyTimesApiKey}&fq=author%3A(%22Richard+Bernstein%22)&sort=newest`;
  // get all that data and store in the database when ready beacause they only allow 1000 requests per day
  try {
    // const articlesData = yield call(request, articlesURL);
    // console.log(articlesData)
    yield put(setArticles(articles));
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
