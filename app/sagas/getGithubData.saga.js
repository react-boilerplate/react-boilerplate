/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { LOAD_REPOS } from 'App/constants';
import { reposLoaded, repoLoadingError } from 'App/actions';
import { take, call, put, select } from 'redux-saga/effects';
import request from '../utils/request';
import usernameSelector from 'usernameSelector';

export function* getGithubData() {
  while (true) {
    yield take(LOAD_REPOS);
    const username = yield select(usernameSelector);
    const requestURL = 'https://api.github.com/users/' + username + '/repos?type=all&sort=updated';
    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL);
    // We return an object in a specific format, see utils/request.js for more information
    if (repos.err === undefined || repos.err === null) {
      yield put(reposLoaded(repos.data));
    } else {
      console.log(repos.err.response);
      yield put(repoLoadingError(repos.err));
    }
  }
}
