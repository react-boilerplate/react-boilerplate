/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(selectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);

  if (!repos.err) {
    yield put(reposLoaded(repos.data, username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* getReposWatcher() {
  while (yield take(LOAD_REPOS)) {
    yield call(getRepos);
  }
}

// Bootstrap sagas
export default [
  getReposWatcher,
];
