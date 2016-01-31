import { createSelector } from 'reselect';

const globalSelector = (state) => state.get('global');

const authenticationSelector = createSelector(
  globalSelector,
  (globalState) => globalState.get('authenticated')
);

const userDataSelector = createSelector(
  globalSelector,
  (globalState) => globalState.get('userData')
);

export default createSelector(
  authenticationSelector,
  userDataSelector,
  (authenticated, userData) => ({ authenticated, userData })
);
