/**
 * App selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

const selectRouter = (state: RootState) => state.router;

export const selectLocation = createSelector(
  [selectRouter],
  routerState => routerState.location,
);
