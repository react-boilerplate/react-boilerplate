/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers

 */
export default function createReducer() {
  const rootReducer = combineReducers({
    global: globalReducer,
    router: connectRouter(history),
  });

  return rootReducer;
}
