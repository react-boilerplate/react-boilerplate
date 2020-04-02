/**
 * App selectors
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types/RootState';

const selectRouter = (state: RootState) => state.router;

export const selectLocation = createSelector(
  [selectRouter],
  routerState => routerState.location,
);
