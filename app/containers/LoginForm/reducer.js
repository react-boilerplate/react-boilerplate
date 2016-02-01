/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import { CHANGE_USER_NAME, CHANGE_PASSWORD, CHANGE_TWO_FACTOR } from './constants';
import { AUTH_ERROR } from 'App/constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  username: 'mxstbr',
  password: '',
  error: null,
  twoFactor: false
});

function formReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_NAME:
      return state.set('username', action.name);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case AUTH_ERROR:
      return state.set('error', action.errorMsg);
    case CHANGE_TWO_FACTOR:
      return state.set('twoFactor', action.code);
    default:
      return state;
  }
}

export default formReducer;
