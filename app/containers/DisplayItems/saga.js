import { takeLatest } from 'redux-saga/effects';
import { GET_ITEMS } from './constants';
import { fetchApi } from './fetchApi';

export default function* displayItemsSaga() {
  yield takeLatest(GET_ITEMS, fetchApi);
}
