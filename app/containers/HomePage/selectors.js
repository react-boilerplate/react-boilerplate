/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUserEmail = () => createSelector(
  selectHome,
  (homeState) => homeState.get('useremail')
);

export {
  selectHome,
  makeSelectUserEmail,
};
