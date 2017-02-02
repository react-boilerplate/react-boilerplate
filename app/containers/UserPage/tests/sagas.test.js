/**
 * Tests for UserPage sagas
 */

import { take, put, cancel, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import { getRepos, githubData } from '../sagas';

const username = 'mxstbr';

/* eslint-disable redux-saga/yield-effects */
describe('getRepos Saga', () => {
  let getReposGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getReposGenerator = getRepos({ username });

    const callDescriptor = getReposGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First repo',
    }, {
      name: 'Second repo',
    }];
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  let generator;
  let taskMock;

  beforeEach(() => {
    generator = githubData();
    taskMock = createMockTask();
  });

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_REPOS, getRepos));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    generator.next();
    const takeDescriptor = generator.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel after LOCATION_CHANGE action', () => {
    generator.next();
    generator.next(taskMock);
    const cancelDescriptor = generator.next();
    expect(cancelDescriptor.value).toEqual(cancel(taskMock));
  });
});
