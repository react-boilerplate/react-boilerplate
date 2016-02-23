/**
 * The username currently entered into the input field on the homepage
 */

import { createSelector } from 'reselect';
import globalSelector from 'globalSelector';

const usernameSelector = createSelector(
  globalSelector,
  (globalState) => globalState.getIn(['userData', 'username'])
);

export default usernameSelector;
