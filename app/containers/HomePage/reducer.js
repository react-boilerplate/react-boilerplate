/* eslint new-cap: ["error", { "capIsNewExceptions": ["CASE"] }] */
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

import { fromJS } from 'immutable';
import { match, CASE, otherwise } from 'match-js';
import { ChangeUsername } from './actions';

// The initial state of the App
const initialState = fromJS({
  username: '',
});

function homeReducer(state = initialState, action) {
  return match(action)(
    CASE(ChangeUsername, ({ payload }) =>
      // Delete prefixed '@' from the github username
      state.set('username', payload.replace(/@/gi, ''))
    ),
    CASE(otherwise, state)
  );
}

export default homeReducer;
