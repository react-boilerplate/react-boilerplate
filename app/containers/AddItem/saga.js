import { all, takeLatest } from 'redux-saga/effects';
import { ADD_ITEM } from './constants';
import { postApi } from './postApi';

function* postItem() {
  yield takeLatest(ADD_ITEM, postApi);
}

export default function* addItemSaga() {
  yield all([postItem()]);
}
