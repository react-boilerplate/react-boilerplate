/**
 * App selectors
 */

import { createSelector } from '@reduxjs/toolkit';

const selectRouter = state => state.router;

const selectLocation = createSelector(
  [selectRouter],
  routerState => routerState.location,
);

export { selectLocation };
