/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return { ...state, yourStateVariable: true };
 */

import { set, lensPath } from 'ramda';
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return set(lensPath(['userData', 'repositories']), false, {
        ...state,
        loading: true,
        error: false,
      });
    case LOAD_REPOS_SUCCESS:
      return set(lensPath(['userData', 'repositories']), action.repos, {
        ...state,
        loading: false,
        currentUser: action.username,
      });
    case LOAD_REPOS_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}

export default appReducer;
