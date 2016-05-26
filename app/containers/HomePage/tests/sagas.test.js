/**
 * Test the getGithubData saga
 */

import expect from 'expect';
import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getGithubData } from '../sagas';

import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

const generator = getGithubData();
const username = 'mxstbr';

describe('getGithubData Saga', () => {
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    expect(generator.next().value).toEqual(race({
      loadRepos: take(LOAD_REPOS),
      stop: take(LOCATION_CHANGE),
    }));
    expect(generator.next(take(LOAD_REPOS)).value).toEqual(select(selectUsername()));
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
    expect(generator.next(username).value).toEqual(call(request, requestURL));
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = {
      data: [{
        name: 'First repo',
      }, {
        name: 'Second repo',
      }],
    };
    expect(generator.next(response).value).toEqual(put(reposLoaded(response.data, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = {
      err: 'Some error',
    };
    expect(generator.next(response).value).toEqual(put(repoLoadingError(response.err)));
  });
});
