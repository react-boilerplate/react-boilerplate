/**
 * Tests for ReposManager sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { loadRepos, reposLoaded, repoLoadingError } from '../slice';

import githubData, { getRepos, addRepoOwnershipKey } from '../saga';

const username = 'username';

const repos = [
  {
    name: 'First repo',
    owner: {
      login: 'react-boilerplate',
    },
  },
  {
    name: 'Second repo',
    owner: {
      login: 'react-boilerplate',
    },
  },
];

const reposWithOwnershipKeys = addRepoOwnershipKey({ username, repos });

/* eslint-disable redux-saga/yield-effects */
describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos();

    const selectDescriptor = getReposGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const requestDescriptor = getReposGenerator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const addRepoOwnershipKeyDescriptor = getReposGenerator.next(repos).value;
    expect(addRepoOwnershipKeyDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const putDescriptor = getReposGenerator.next(reposWithOwnershipKeys).value;
    expect(putDescriptor).toEqual(
      put(reposLoaded({ repos: reposWithOwnershipKeys })),
    );
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const putDescriptor = getReposGenerator.throw(new Error('Some error'))
      .value;
    expect(putDescriptor).toEqual(put(repoLoadingError()));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(loadRepos.type, getRepos));
  });
});
