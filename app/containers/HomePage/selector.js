import { createSelector } from 'reselect';

const globalSelector = (state) => state.get('global');

const reposSelector = createSelector(
  globalSelector,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const usernameSelector = createSelector(
  globalSelector,
  (globalState) => globalState.getIn(['userData', 'username'])
);

export default createSelector(
  reposSelector,
  usernameSelector,
  (repos, username) => ({ repos, username })
);
