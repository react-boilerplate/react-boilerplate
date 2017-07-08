/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { combineReducers } from 'redux-immutable';
import { List } from 'immutable';

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';

function loading(state = false, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return true;
    case LOAD_REPOS_SUCCESS:
      return false;
    case LOAD_REPOS_ERROR:
      return false;
    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return false;
    case LOAD_REPOS_SUCCESS:
      return false;
    case LOAD_REPOS_ERROR:
      return action.error;
    default:
      return state;
  }
}

function currentUser(state = false, action) {
  switch (action.type) {
    case LOAD_REPOS_SUCCESS:
      return action.username;
    default:
      return state;
  }
}

function repositories(state = false, action) {
  if (List.isList(state)) {
    // normalize the state from the server
    state = state.toJS(); // eslint-disable-line no-param-reassign
  }

  switch (action.type) {
    case LOAD_REPOS:
      return false;
    case LOAD_REPOS_SUCCESS:
      return action.repos;
    default:
      return state;
  }
}

const userData = combineReducers({
  repositories,
});

export default combineReducers({
  loading,
  error,
  currentUser,
  userData,
});
