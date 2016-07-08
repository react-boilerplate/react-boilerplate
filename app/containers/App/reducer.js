/* eslint new-cap: ["error", { "capIsNewExceptions": ["CASE"] }] */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * CASE( YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LoadReposSuccess,
  LoadRepos,
  LoadReposError,
} from './actions';
import { match, CASE, otherwise } from 'match-js';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: fromJS({
    repositories: false,
  }),
});

function appReducer(state = initialState, action) {
  return match(action)(
    CASE(LoadRepos, () =>
      state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false)
    ),
    CASE(LoadReposSuccess, ({ payload }) =>
      state
        .setIn(['userData', 'repositories'], payload.repos)
        .set('loading', false)
        .set('currentUser', payload.username)
    ),
    CASE(LoadReposError, ({ payload }) =>
      state
        .set('error', payload)
        .set('loading', false)
    ),
    CASE(otherwise, state)
  );
}

export default appReducer;
