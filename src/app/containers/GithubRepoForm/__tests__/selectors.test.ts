import * as selectors from '../selectors';
import { RootState } from 'types';
import { RepoErrorType } from '../types';
import { initialState } from '../slice';
import { Repo } from 'types/Repo';

describe('GithubRepoForm selectors', () => {
  let state: RootState = {};

  beforeEach(() => {
    state = {};
  });

  it('should select the initial state', () => {
    expect(selectors.selectUsername(state)).toEqual(initialState.username);
  });

  it('should select username', () => {
    const username = 'test';
    state = {
      githubRepoForm: { ...initialState, username: username },
    };
    expect(selectors.selectUsername(state)).toEqual(username);
  });

  it('should select username', () => {
    const repo = { name: 'test' } as Repo;
    state = {
      githubRepoForm: { ...initialState, repositories: [repo] },
    };
    expect(selectors.selectRepos(state)).toEqual([repo]);
  });

  it('should select error', () => {
    const error = RepoErrorType.USER_NOT_FOUND;
    state = {
      githubRepoForm: { ...initialState, error: error },
    };
    expect(selectors.selectError(state)).toEqual(error);
  });

  it('should select loading', () => {
    const loading = true;
    state = {
      githubRepoForm: { ...initialState, loading: loading },
    };
    expect(selectors.selectLoading(state)).toEqual(loading);
  });
});
