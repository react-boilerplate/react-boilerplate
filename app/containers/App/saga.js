/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_STR } from 'containers/App/constants';
import { stringsLoaded, stringLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  const requestURL = `http://localhost:3000/api/strlist`;

  try {
    // Call our request helper (see 'utils/request')
    const strlist = yield call(request, requestURL);
    yield put(stringsLoaded(strlist));
  } catch (err) {
    yield put(stringLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* stringListData() {
  // Watches for LOAD_STR actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_STR, getRepos);
}
