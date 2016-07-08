import expect from 'expect';
import appReducer from '../reducer';
import {
  LoadRepos,
  LoadReposSuccess,
  LoadReposError,
} from '../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      userData: fromJS({
        repositories: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false);

    expect(appReducer(state, LoadRepos.action())).toEqual(expectedResult);
  });

  it('should handle the LoadReposSuccess action correctly', () => {
    const fixture = [{
      name: 'My Repo',
    }];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, LoadReposSuccess.action({ repos: fixture, username }))).toEqual(expectedResult);
  });

  it('should handle the LoadReposError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, LoadReposError.action(fixture))).toEqual(expectedResult);
  });
});
