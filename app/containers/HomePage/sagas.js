/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_BOUNTY } from '../../containers/App/constants';
import { bountyLoaded, bountyLoadError } from '../../containers/App/actions';

import request from '../../utils/request';
import { makeSelectUserEmail } from '../../containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getBounty() {
  // Select username from store
  const useremail = yield select(makeSelectUserEmail());
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = 16000;

  // const requestURL = `${protocol}//${hostname}:${port}/check/${useremail}`;
  const requestURL = '//bounty.brickblock.dmx/check/dmitry.medvedev@gmail.com';
  // http://localhost:16000/check/dmitry.medvedev@gmail.com
  console.log(`requestURL: ${requestURL}`);

  try {
    const data = yield call(request, requestURL);
    yield put(bountyLoaded(data));
  } catch (err) {
    yield put(bountyLoadError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* bountyData() {
  // Watches for LOAD_BOUNTY actions and calls getBounty when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_BOUNTY, getBounty);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  bountyData,
];
