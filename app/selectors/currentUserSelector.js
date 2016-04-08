/**
 * The currently loaded user
 */

import { createSelector } from 'reselect';
import globalSelector from 'globalSelector';

const currentUserSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.get('currentUser')
);

export default currentUserSelector;
