/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const globalSelector = () => (state) => state.get('global');

const currentUserSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.get('currentUser')
);

const loadingSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.get('loading')
);

const errorSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.get('error')
);

const reposSelector = () => createSelector(
  globalSelector(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const locationStateSelector = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  globalSelector,
  currentUserSelector,
  loadingSelector,
  errorSelector,
  reposSelector,
  locationStateSelector,
};
