/**
 * Homepage selectors
 */

import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// TODO: Add an explanation for this
const selectDomain = (state: RootState) => state.githubRepoForm || initialState;

export const selectUsername = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.username,
);

export const selectLoading = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.error,
);

export const selectRepos = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.repositories,
);
