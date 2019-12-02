/**
 * App selectors
 */

import { createSelector } from '@reduxjs/toolkit';

const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState => routerState.location);

export { makeSelectLocation };
