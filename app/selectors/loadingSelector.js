/**
 * Are we loading anything at the moment
 */

import { createSelector } from 'reselect';
import homeSelector from 'homeSelector';

const loadingSelector = createSelector(
  homeSelector,
  (homeState) => homeState.get('loading')
);

export default loadingSelector;
