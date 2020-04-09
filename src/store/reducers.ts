/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(
  injectedReducers: InjectedReducersType = {},
) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    router: connectRouter(history),
  });

  return rootReducer;
}
