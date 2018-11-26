import { all, takeLatest } from 'redux-saga/effects';
import { GET_ITEMS } from './constants';
import { fetchApi } from './fetchApi';

function* getAllItems() {
  yield takeLatest(GET_ITEMS, fetchApi);
}

export default function* displayItemsSaga() {
  yield all([getAllItems()]);
}
