import {
  selectReposManagerDomain,
  selectLoading,
  selectError,
  selectRepos,
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

describe('selectLoading', () => {
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      reposManager: {
        loading,
      },
    };
    expect(selectLoading(mockedState)).toEqual(loading);
  });
});

describe('selectError', () => {
  it('should select the error', () => {
    const error = true;
    const mockedState = {
      reposManager: {
        error,
      },
    };
    expect(selectError(mockedState)).toEqual(error);
  });
});

describe('selectRepos', () => {
  it('should select the repos', () => {
    const repositories = [];
    const mockedState = {
      reposManager: {
        repositories,
      },
    };
    expect(selectRepos(mockedState)).toEqual(repositories);
  });
});
