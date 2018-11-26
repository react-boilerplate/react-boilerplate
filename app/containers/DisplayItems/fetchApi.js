import { put } from 'redux-saga/effects';
import { getItemsSuccess, getItemsError } from './actions';

export function* fetchApi() {
  try {
    const response = yield fetch('/api/getItems');
    const items = yield response.json();
    console.log(items);
    yield put(getItemsSuccess(items));
  } catch (error) {
    console.error(error);
    yield put(getItemsError());
  }
}
