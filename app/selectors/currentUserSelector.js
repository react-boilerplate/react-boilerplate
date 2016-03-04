/**
 * The currently loaded user
 */

import { createSelector } from 'reselect';
import homeSelector from 'homeSelector';

const currentUserSelector = createSelector(
  homeSelector,
  (homeState) => homeState.get('currentUser')
);

export default currentUserSelector;
