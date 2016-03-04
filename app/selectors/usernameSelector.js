/**
 * The username currently entered into the input field on the homepage
 */

import { createSelector } from 'reselect';
import homeSelector from 'homeSelector';

const usernameSelector = createSelector(
  homeSelector,
  (homeState) => homeState.getIn(['userData', 'username'])
);

export default usernameSelector;
