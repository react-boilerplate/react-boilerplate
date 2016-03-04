/**
 * If an error happened, it's in here
 */

import { createSelector } from 'reselect';
import homeSelector from 'homeSelector';

const errorSelector = createSelector(
  homeSelector,
  (homeState) => homeState.get('error')
);

export default errorSelector;
