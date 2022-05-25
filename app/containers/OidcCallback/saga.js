/** ----  Vault Vision added code file ---- */
/**
 * Uses the userManager to validate the token received from the login flow
 * and to use that token to return a user object populated with the rest of the user profile information
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { VALIDATE_AUTH_CALLBACK } from 'containers/App/constants';
import { authSuccess, validateAuthError } from 'containers/App/actions';

import { userManager } from '../../utils/userManager';

async function getUser() {
  return userManager.signinCallback();
}

function* getData() {
  try {
    const user = yield call(getUser);
    console.log(user);

    yield put(authSuccess(user));
  } catch (err) {
    yield put(validateAuthError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* oidcUserData() {
  // Watches for VALIDATE_AUTH_CALLBACK actions and calls getData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(VALIDATE_AUTH_CALLBACK, getData);
}
