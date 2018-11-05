/**
 * Gets the repositories of the user from Github
 */

import { call, select, takeLatest } from 'redux-saga/effects';
import { makeSelectManufacturerFormData } from './selectors';
import { CREATE_MANUFACTURER } from './constants';
import ManufacturerAPI from './apis/manufacturer';

export function* createManufacturer() {
  const mfCreationPayload = yield select(makeSelectManufacturerFormData());

  try {
    // Call our request helper (see 'utils/request')
    yield call(ManufacturerAPI.create, mfCreationPayload);
    console.log('call successful with data: ', mfCreationPayload);
  } catch (err) {
    console.error('call failed with data: ', mfCreationPayload);
    console.error(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* manufacturerCreation() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CREATE_MANUFACTURER, createManufacturer);
}
