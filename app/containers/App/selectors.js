/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { path, prop, equals } from 'ramda';

const selectGlobal = prop('global');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, prop('currentUser'));

const makeSelectLoading = () => createSelector(selectGlobal, prop('loading'));

const makeSelectError = () => createSelector(selectGlobal, prop('error'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, path(['userData', 'repositories']));

const makeSelectLocationState = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.route; // or state.route

    if (!equals(routingState, prevRoutingState)) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocationState,
};
