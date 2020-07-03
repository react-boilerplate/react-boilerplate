import { createSelector } from 'reselect';
import { initialState } from './slice';

/**
 * Direct selector to the reposManager state domain
 */

const selectReposManagerDomain = state => state.reposManager || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(
    selectReposManagerDomain,
    reposManagerState => reposManagerState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectReposManagerDomain,
    reposManagerState => reposManagerState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectReposManagerDomain,
    reposManagerState => reposManagerState.repositories,
  );

export {
  selectReposManagerDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
