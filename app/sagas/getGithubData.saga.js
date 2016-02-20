/* eslint-disable no-constant-condition */

import { LOAD_REPOS } from 'App/constants';
import { reposLoaded, repoLoadingError } from 'App/actions';
import { take, call, put } from 'redux-saga/effects';
import request from '../utils/request';

export function* getGithubData(getState) {
  while (true) {
    yield take(LOAD_REPOS);
    const state = yield getState();
    const username = state.getIn(['global', 'userData', 'username']);
    const requestURL = 'https://api.github.com/users/' + username + '/repos?type=all&sort=updated';
    const repos = yield call(request, requestURL);
    if (repos.err === undefined || repos.err === null) {
      yield put(reposLoaded(repos.data));
    } else {
      yield put(repoLoadingError(repos.err));
      console.log(repos.err.response);
    }
  }
}
