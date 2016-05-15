/*
 * HomeReducer
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
  CHANGE_USERNAME,
} from './constants';
import { Record } from 'immutable';

// A Record is an immutable similar to Map, but can be accessed
// with dot notation
// see https://facebook.github.io/immutable-js/docs/#/Record
const HomeRecord = Record({ username: '' }, 'HomeRecord'); // eslint-disable-line

// The initial state of the App initialised by default record
const initialState = new HomeRecord({});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default homeReducer;
