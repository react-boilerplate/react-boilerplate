/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['language', 'router'],
};
export const staticReducersKeys = ['global', 'language', 'router'];

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const reducers = {
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  };

  return persistCombineReducers(persistConfig, reducers);
}
