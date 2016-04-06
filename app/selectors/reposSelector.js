/**
 * The loaded respositories
 */

import { createSelector } from 'reselect';
import globalSelector from 'globalSelector';

const reposSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

export default reposSelector;
