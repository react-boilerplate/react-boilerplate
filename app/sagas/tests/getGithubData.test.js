import expect from 'expect';
import { take, call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { getGithubData } from '../getGithubData.saga';
import {
  LOAD_REPOS
} from 'App/constants';
import {
  reposLoaded,
  repoLoadingError
} from 'App/actions';
import request from '../../utils/request';

const state = fromJS({
  global: {
    userData: {
      username: 'mxstbr'
    }
  }
});
const getState = () => state;
const generator = getGithubData(getState);

describe('getGithubData Saga', () => {
  beforeEach(() => {
    expect(generator.next().value).toEqual(take(LOAD_REPOS));
    const username = state.getIn(['global', 'userData', 'username']);
    const requestURL = 'https://api.github.com/users/' + username + '/repos?type=all&sort=updated';
    expect(generator.next().value).toEqual(call(request, requestURL));
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = {
      data: [{
        name: 'First repo'
      }, {
        name: 'Second repo'
      }]
    };
    expect(generator.next(response).value).toEqual(put(reposLoaded(response.data)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = {
      err: 'Some error'
    };
    expect(generator.next(response).value).toEqual(put(repoLoadingError(response.err)));
  });
});
