import {
  selectReposManagerDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
} from '../selectors';
import { initialState } from '../slice';

describe('selectReposManagerDomain', () => {
  it('should select the reposManager state', () => {
    const reposManagerState = {
      repos: [],
      loading: true,
      error: false,
    };
    const mockedState = {
      reposManager: reposManagerState,
    };
    expect(selectReposManagerDomain(mockedState)).toEqual(reposManagerState);
  });

  it("should return the initial state if reposManager isn't defined", () => {
    expect(selectReposManagerDomain({})).toEqual(initialState);
  });
});

describe('makeSelectLoading', () => {
  it('should select the loading', () => {
    const loadingSelector = makeSelectLoading();
    const loading = false;
    const mockedState = {
      reposManager: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  it('should select the error', () => {
    const errorSelector = makeSelectError();
    const error = true;
    const mockedState = {
      reposManager: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  it('should select the repos', () => {
    const reposSelector = makeSelectRepos();
    const repositories = [];
    const mockedState = {
      reposManager: {
        repositories,
      },
    };
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});
