import {
  LOGIN_CALLBACK_REQUEST,
  LOGIN_CALLBACK_ERROR,
} from './constants';

export function loginCallbackRequest() {
  return {
    type: LOGIN_CALLBACK_REQUEST,
  };
}

export function loginCallbackError(error) {
  return {
    type: LOGIN_CALLBACK_ERROR,
    error,
  };
}
