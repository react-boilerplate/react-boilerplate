/** ----  Vault Vision added code file ---- */
/**
 * Gets the auth state from any local session
 * Useful on App startup, especially on a refresh when a user is still logged in with a local session
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USER } from 'containers/App/constants';
import { validateAuthError, userLoaded } from 'containers/App/actions';

import { userManager } from '../../utils/userManager';

async function loadUserFromManager() {
  console.log('getting auth data');
  return userManager.getUser();
}

function* loadUser() {
  try {
    const user = yield call(loadUserFromManager);
    console.log(user);

    yield put(userLoaded(user));
  } catch (err) {
    yield put(validateAuthError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* oidcLoadUser() {
  // Watches for LOAD_USER actions and calls loadData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USER, loadUser);
}
