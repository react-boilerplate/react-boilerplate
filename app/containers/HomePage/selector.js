import { createSelector } from 'reselect';

const globalSelector = (state) => state.get('global');

const authenticationSelector = createSelector(
  globalSelector,
  (globalState) => globalState.get('authenticated')
);

const reposSelector = createSelector(
  globalSelector,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

export default createSelector(
  authenticationSelector,
  reposSelector,
  (authenticated, repositories) => ({ authenticated, repositories })
);
