import { set, lensPath } from 'ramda';
import appReducer from '../reducer';
import { loadRepos, reposLoaded, repoLoadingError } from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      currentUser: false,
      userData: {
        repositories: false,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = set(lensPath(['userData', 'repositories']), false, {
      ...state,
      loading: true,
      error: false,
    });

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = set(
      lensPath(['userData', 'repositories']),
      fixture,
      {
        ...state,
        loading: false,
        currentUser: username,
      }
    );

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(
      expectedResult
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = { ...state, error: fixture, loading: false };

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(
      expectedResult
    );
  });
});
