/**
 * Homepage selectors
 */

import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// TODO: Add an explanation for this
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
