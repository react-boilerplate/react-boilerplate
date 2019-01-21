/**
 * Gets the repositories of the user from Github
 */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {makeSelectManufacturerFormData} from './selectors';
import {CREATE_MANUFACTURER, VIEW_ALL_MANUFACTURER} from './constants';
import ManufacturerAPI from './apis/manufacturer';
import {
  createManufacturerProcessing,
  createManufacturerSuccess,
  getAllManufacturersProcessing,
  getAllManufacturersSuccess
} from "./actions";

export function* createManufacturer() {
  const mfCreationPayload = yield select(makeSelectManufacturerFormData());

  try {
    // Call our request helper (see 'utils/request')
    yield put(createManufacturerProcessing(true))
    yield call(ManufacturerAPI.create, mfCreationPayload);
    console.log('call successful with data: ', mfCreationPayload);
    yield put(createManufacturerSuccess(true))
    yield put(createManufacturerProcessing(false))
  } catch (err) {
    console.error('call failed with data: ', mfCreationPayload);
    console.error(err);
    yield put(createManufacturerSuccess(false))
    yield put(createManufacturerProcessing(false))
  }
}

export function* viewAllManufacturers() {
  try {
    // Call our request helper (see 'utils/request')
    yield put(getAllManufacturersProcessing(true))
    const manufacturersList = yield call(ManufacturerAPI.getAllManufacturers);
    console.log('call successful with data: ', manufacturersList);
    yield put(getAllManufacturersSuccess(manufacturersList.data))
    yield put(getAllManufacturersProcessing(false))
  } catch (err) {
    console.error('failed to fetch data.');
    console.error(err);
    yield put(getAllManufacturersProcessing(false))
    yield put(getAllManufacturersSuccess([]))
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
  yield takeLatest(VIEW_ALL_MANUFACTURER, viewAllManufacturers);
  yield takeLatest(CREATE_MANUFACTURER, createManufacturer);
}
