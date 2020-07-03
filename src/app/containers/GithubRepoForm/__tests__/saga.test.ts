import { put, takeLatest } from 'redux-saga/effects';
import * as slice from '../slice';

import { githubRepoFormSaga, getRepos } from '../saga';
import { RepoErrorType } from '../types';

describe('getRepos Saga', () => {
  let username: any;
  let repos: any;
  let getReposIterator: ReturnType<typeof getRepos>;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposIterator = getRepos();
    const delayDescriptor = getReposIterator.next().value;
    expect(delayDescriptor).toMatchSnapshot();

    const selectDescriptor = getReposIterator.next().value;
    expect(selectDescriptor).toMatchSnapshot();
  });

  it('should return error if username is empty', () => {
    username = '';
    const putDescriptor = getReposIterator.next(username).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USERNAME_EMPTY)),
    );

    const iteration = getReposIterator.next();
    expect(iteration.done).toBe(true);
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    username = 'test';
    repos = [
      {
        name: 'repo1',
        owner: {
          login: 'username1',
        },
      },
    ];

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.next(repos).value;
    expect(putDescriptor).toEqual(put(slice.actions.reposLoaded(repos)));
  });

  it('should dispatch the user not found error', () => {
    username = 'test';

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw({ response: { status: 404 } })
      .value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USER_NOT_FOUND)),
    );
  });
  it('should dispatch the user has no repo error', () => {
    username = 'test';
    repos = [];

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.next(repos).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.USER_HAS_NO_REPO)),
    );
  });
  it('should dispatch the github rate limit error', () => {
    username = 'test';

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw(new Error('Failed to fetch'))
      .value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT)),
    );
  });

  it('should dispatch the response error', () => {
    username = 'test';

    const requestDescriptor = getReposIterator.next(username).value;
    expect(requestDescriptor).toMatchSnapshot();

    const putDescriptor = getReposIterator.throw(new Error('some error')).value;
    expect(putDescriptor).toEqual(
      put(slice.actions.repoError(RepoErrorType.RESPONSE_ERROR)),
    );
  });
});

describe('githubRepoFormSaga Saga', () => {
  const githubRepoFormIterator = githubRepoFormSaga();
  it('should start task to watch for loadRepos action', () => {
    const takeLatestDescriptor = githubRepoFormIterator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(slice.actions.loadRepos.type, getRepos),
    );
  });
});
