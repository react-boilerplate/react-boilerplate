/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_STR,
  LOAD_STR_SUCCESS,
  LOAD_STR_ERROR,
  ADD_NEW_STR,
  CHANGE_STRING,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_STR
 */
export function loadStrings() {
  return {
    type: LOAD_STR,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_STR_SUCCESS passing the repos
 */
export function stringsLoaded(strlist) {
  return {
    type: LOAD_STR_SUCCESS,
    strlist,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STR_ERROR passing the error
 */
export function stringLoadingError(error) {
  return {
    type: LOAD_STR_ERROR,
    error,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function addNewString() {
  return {
    type: ADD_NEW_STR,
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} currentuser The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeNewString(newStr) {
  return {
    type: CHANGE_STRING,
    newStr,
  };
}
