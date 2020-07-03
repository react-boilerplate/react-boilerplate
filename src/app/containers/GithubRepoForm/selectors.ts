import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
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
