import { expect } from 'chai';
import appReducer from '../reducer';
import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
} from '../actions';
import { Record } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    const UserDataRecord = Record({ // eslint-disable-line
      repositories: false,
    },
    'UserData'
    );

    const GlobalRecord = Record({ // eslint-disable-line
      loading: false,
      error: false,
      currentUser: false,
      userData: new UserDataRecord({}),
    },
    'GlobalRecord'
    );

    state = new GlobalRecord({});
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).to.equal(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false);

    expect(appReducer(state, loadRepos())).to.equal(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo',
    }];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, reposLoaded(fixture, username))).to.equal(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, repoLoadingError(fixture))).to.equal(expectedResult);
  });
});
