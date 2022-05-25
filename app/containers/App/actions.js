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

/** ----  Vault Vision changed code block ---- */
import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  AUTH_SUCCESS,
  VALIDATE_AUTH_CALLBACK,
  VALIDATE_AUTH_ERROR,
  LOAD_USER,
  LOAD_USER_SUCCESS,
} from './constants';
/** ---- end block ----  */

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

/**
 * Vault Vision added action for when a user gets a login token
 * Dispatched when the callback page is loaded to trigger the saga
 *
 *
 * @return {object}      An action object with the user data
 */
export function authSuccess(user) {
  return {
    type: AUTH_SUCCESS,
    user,
  };
}

/**
 * Vault Vision added action for when the auth token has bee processed and validated
 * Dispatched by the oidc/callback to initiate validation of the token returned by
 * the Vault Vision authentication platform
 *
 *
 */
export function validateAuthCallback() {
  return {
    type: VALIDATE_AUTH_CALLBACK,
  };
}

export function validateAuthError(error) {
  return {
    type: VALIDATE_AUTH_ERROR,
    error,
  };
}

/**
 * Vault Vision added action for when the application loads for the first time
 * and the application needs to check the local session state to see if a user
 * has already authenicated and is still in local session.
 *
 */
export function loadUser() {
  return {
    type: LOAD_USER,
  };
}

/**
 * Vault Vision added action for when a user gets returned by the loadUser
 * action.  This is the Success action to trigger the saving of the user
 * back into the global state
 *
 *
 * @return {object}      An action object with the user data
 */
export function userLoaded(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user,
  };
}
