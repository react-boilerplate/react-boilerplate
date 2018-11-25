import { put } from 'redux-saga/effects';
import { addItemSuccess, addItemError } from './actions';

export function* postApi(action) {
  const { item } = action;
  try {
    const response = yield fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ item }),
    });
    yield put(addItemSuccess(response.status));
  } catch (error) {
    yield put(addItemError(error));
  }
}
