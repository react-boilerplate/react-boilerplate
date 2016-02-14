/* eslint-disable no-constant-condition */

import { LOAD_REPOS } from 'App/constants';
import { reposLoaded } from 'App/actions';
import { take, call, put } from 'redux-saga';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

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
      console.log(repos.err.response);
    }
  }
}
