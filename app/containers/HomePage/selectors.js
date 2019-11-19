/**
 * Homepage selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHome,
    homeState => homeState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectHome,
    homeState => homeState.repositories,
  );

export {
  selectHome,
  makeSelectUsername,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
