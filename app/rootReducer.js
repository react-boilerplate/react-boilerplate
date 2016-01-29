/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { routeReducer } from 'react-router-redux';
import homeReducer from 'HomePage/reducer';

export default combineReducers({
  route: routeReducer,
  home: homeReducer
});
