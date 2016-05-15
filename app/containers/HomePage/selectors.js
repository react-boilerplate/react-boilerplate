/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const homeSelector = () => (state) => state.get('home');

const usernameSelector = () => createSelector(
  homeSelector(),
  (homeState) => homeState.get('username')
);

export {
  homeSelector,
  usernameSelector,
};
