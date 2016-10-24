/**
 * 1. sets up auth library and waits for auth token
 * 2. gets user profile
 */

import { call, put, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { loginCallback, getProfile } from './lib';
import { loginCallbackRequest, loginCallbackError } from './actions';
import { setViewer } from 'containers/Viewer/actions';

function* loginCallbackSaga() {
  try {
    const { nextPathname } = yield call(loginCallback);
    const profile = yield call(getProfile);
    yield put(setViewer(profile));
    return nextPathname;
  } catch (err) {
    // TODO display error to user
    yield put(loginCallbackError(err));
    return '/';
  }
}

function* init() {
  yield take(loginCallbackRequest().type);
  const nextPathname = yield call(loginCallbackSaga);
  browserHistory.push(nextPathname);
}

export default [
  init,
];
