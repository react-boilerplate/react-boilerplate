/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import { CHANGE_USER_NAME, CHANGE_PASSWORD, FORM_SUBMITTED, CHANGE_TWO_FACTOR } from './constants';

export function changeUsername(name) {
  return { type: CHANGE_USER_NAME, name };
}

export function changePassword(password) {
  return { type: CHANGE_PASSWORD, password };
}

export function hasTwoFactorEnabled() {
  return changeTwoFactor('');
}

export function changeTwoFactor(code) {
  return {
    type: CHANGE_TWO_FACTOR,
    code
  };
}

export function submitForm() {
  return {
    type: FORM_SUBMITTED
  };
}
