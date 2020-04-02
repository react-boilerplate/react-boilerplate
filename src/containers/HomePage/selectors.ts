/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { RootState } from 'types/RootState';
import { initialState } from './slice';

const selectHomePageDomain = (state: RootState) =>
  state.homepage || initialState;

export const selectUsername = createSelector(
  [selectHomePageDomain],
  homepageState => homepageState.username,
);

export const selectLoading = createSelector(
  [selectHomePageDomain],
  homepageState => homepageState.loading,
);

export const selectError = createSelector(
  [selectHomePageDomain],
  homepageState => homepageState.error,
);

export const selectRepos = createSelector(
  [selectHomePageDomain],
  homepageState => homepageState.repositories,
);
