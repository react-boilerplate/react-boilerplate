import { AUTH_SUCCESS, AUTH_ERROR } from './constants';

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
