import { AUTH_SUCCESS, AUTH_ERROR, REPOS_LOADED } from './constants';

export function authenticationSuccessful(data) {
  return {
    type: AUTH_SUCCESS,
    data
  };
}

export function authenticationFailed(errorMsg) {
  return {
    type: AUTH_ERROR,
    errorMsg
  };
}

export function repositoriesLoaded(repos) {
  return {
    type: REPOS_LOADED,
    repos
  };
}
