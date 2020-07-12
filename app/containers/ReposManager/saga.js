/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { loadRepos, reposLoaded, repoLoadingError } from './slice';

// If the repository is owned by a different user then the submitted
// username, it's a fork and we will show the name of the owner in RepoListItem
export const addRepoOwnershipKey = ({ username, repos }) =>
  repos.map(repo => ({
    isOwnRepo: repo.owner.login === username,
    ...repo,
  }));

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    const reposWithOwnershipKey = yield call(addRepoOwnershipKey, {
      username,
      repos,
    });
    yield put(reposLoaded({ repos: reposWithOwnershipKey }));
  } catch (err) {
    yield put(repoLoadingError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(loadRepos.type, getRepos);
}
