/**
 * Handle all communications with manufacturer API.
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectManufacturerFormData } from './selectors';
import {
  CREATE_MANUFACTURER,
  VIEW_ALL_MANUFACTURER,
  VIEW_MANUFACTURER_DETAIL,
} from './constants';
import ManufacturerAPI from './apis/manufacturer';
import {
  createManufacturerProcessing,
  createManufacturerSuccess,
  getAllManufacturersProcessing,
  getAllManufacturersSuccess,
  getManufacturerDetailProcessing,
  getManufacturerDetailSuccess,
} from './actions';

export function* createManufacturer() {
  const mfCreationPayload = yield select(makeSelectManufacturerFormData());

  try {
    // Call our request helper (see 'utils/request')
    yield put(createManufacturerProcessing(true));
    yield call(ManufacturerAPI.create, mfCreationPayload);
    yield put(createManufacturerSuccess(true));
    yield put(createManufacturerProcessing(false));
  } catch (err) {
    yield put(createManufacturerSuccess(false));
    yield put(createManufacturerProcessing(false));
  }
}

export function* viewAllManufacturers() {
  try {
    // Call our request helper (see 'utils/request')
    yield put(getAllManufacturersProcessing(true));
    const manufacturersList = yield call(ManufacturerAPI.getAllManufacturers);
    yield put(getAllManufacturersSuccess(manufacturersList.data));
    yield put(getAllManufacturersProcessing(false));
  } catch (err) {
    yield put(getAllManufacturersProcessing(false));
    yield put(getAllManufacturersSuccess([]));
  }
}

export function* viewManufacturerDetail(action) {
  try {
    // Call our request helper (see 'utils/request')
    yield put(getManufacturerDetailProcessing(true));
    const manufacturer = yield call(
      ManufacturerAPI.getManufacturerDetailFor,
      action.payload,
    );
    yield put(getManufacturerDetailSuccess(manufacturer.data));
    yield put(getManufacturerDetailProcessing(false));
  } catch (err) {
    yield put(getManufacturerDetailProcessing(false));
    yield put(getManufacturerDetailSuccess({}));
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
  yield takeLatest(VIEW_MANUFACTURER_DETAIL, viewManufacturerDetail);
  yield takeLatest(CREATE_MANUFACTURER, createManufacturer);
}
