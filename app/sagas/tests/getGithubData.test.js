import expect from 'expect';
import { take, call, put, select } from 'redux-saga/effects';
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
import usernameSelector from 'usernameSelector';

const state = fromJS({
  global: {
    userData: {
      username: undefined // TODO dirty workaround for 0.9.1 update
    }
  }
});
const generator = getGithubData();

describe('getGithubData Saga', () => {
  beforeEach(() => {
    expect(generator.next().value).toEqual(take(LOAD_REPOS));
    expect(generator.next().value).toEqual(select(usernameSelector));
    const username = state.getIn(['global', 'userData', 'username']);
    console.log('test username', username);
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
