import { createSelector } from 'reselect';
import { initialState } from './slice';

/**
 * Direct selector to the reposManager state domain
 */

const selectReposManagerDomain = state => state.reposManager || initialState;

/**
 * Other specific selectors
 */

const selectLoading = createSelector(
  [selectReposManagerDomain],
  reposManagerState => reposManagerState.loading,
);

const selectError = createSelector(
  [selectReposManagerDomain],
  reposManagerState => reposManagerState.error,
);

const selectRepos = createSelector(
  [selectReposManagerDomain],
  reposManagerState => reposManagerState.repositories,
);

export { selectReposManagerDomain, selectLoading, selectError, selectRepos };
