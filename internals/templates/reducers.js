/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import invariant from 'invariant';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers) {
  invariant(
    isObject(injectedReducers) &&
      Object.keys(injectedReducers) &&
      Object.values(injectedReducers).every(isFunction),
    "(app/reducers) createReducer: 'injectedReducers' must be an object of reducer functions",
  );

  const rootReducer = combineReducers({
    language: languageProviderReducer,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
