/**
 * Are we loading anything at the moment
 */

import { createSelector } from 'reselect';
import globalSelector from 'globalSelector';

const loadingSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.get('loading')
);

export default loadingSelector;
