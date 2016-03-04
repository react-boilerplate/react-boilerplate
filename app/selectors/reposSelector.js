/**
 * The loaded respositories
 */

import { createSelector } from 'reselect';
import homeSelector from 'homeSelector';

const reposSelector = createSelector(
  homeSelector,
  (homeState) => homeState.getIn(['userData', 'repositories'])
);

export default reposSelector;
