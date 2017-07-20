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

import { fromJS } from 'immutable';

import {
  LOAD_BOUNTY,
  LOAD_BOUNTY_SUCCESS,
  LOAD_BOUNTY_ERROR,

} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  bounty: {
    message_id: 'bounty.HomePage.initial_message',
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOUNTY:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_BOUNTY_SUCCESS:
      return state
        .set('bounty', action.data.payload)
        .set('loading', false)
        .set('error', false);
    case LOAD_BOUNTY_ERROR:
      return state
        .set('error', action.data.exception)
        .setIn(['bounty', 'exception'], action.data.exception)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
