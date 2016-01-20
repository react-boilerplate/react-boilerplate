/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import homeReducer from './containers/HomePage/HomePage.reducer';

export default combineReducers({
  routing: routeReducer,
  home: homeReducer
});
