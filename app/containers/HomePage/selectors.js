/**
 * Homepage selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(selectHome, homeState => homeState.username);

export { selectHome, makeSelectUsername };
