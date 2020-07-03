import produce from 'immer';

import { reducer, loadRepos, reposLoaded, repoLoadingError } from '../slice';

describe('slice actions and reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      repositories: [],
      loading: false,
      error: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.repositories = [];
    });

    expect(reducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.repositories = fixture;
      draft.loading = false;
    });

    expect(reducer(state, reposLoaded({ repos: fixture }))).toEqual(
      expectedResult,
    );
  });

  it('should handle the repoLoadingError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.error = true;
      draft.loading = false;
    });

    expect(reducer(state, repoLoadingError())).toEqual(expectedResult);
  });
});
