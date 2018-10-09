/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return connectRouter(history)(
    combineReducers({
      global: globalReducer,
      language: languageProviderReducer,
      ...injectedReducers,
    }),
  );
}
