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

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';
import { Record } from 'immutable';

// A Record is an immutable similar to Map, but can be accessed
// with dot notation
// see https://facebook.github.io/immutable-js/docs/#/Record
const UserDataRecord = Record({ // eslint-disable-line
  repositories: false,
},
'UserData'
);

const GlobalRecord = Record({ // eslint-disable-line
  loading: false,
  error: false,
  currentUser: false,
  userData: new UserDataRecord({}),
},
'GlobalRecord'
);

// The initial state of the App initialised by default record
const initialState = new GlobalRecord({});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default globalReducer;
