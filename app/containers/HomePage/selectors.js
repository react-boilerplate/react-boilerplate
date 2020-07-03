/**
 * Homepage selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectHome = state => state.home || initialState;

const selectUsername = createSelector(
  [selectHome],
  homeState => homeState.username,
);

export { selectHome, selectUsername };
