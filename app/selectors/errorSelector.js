/**
 * If an error happened, it's in here
 */

import { createSelector } from 'reselect';
import globalSelector from './globalSelector';

const errorSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.get('error')
);

export default errorSelector;
