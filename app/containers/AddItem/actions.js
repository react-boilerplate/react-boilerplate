import { ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR } from './constants';

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

export function addItemSuccess(success) {
  return {
    type: ADD_ITEM_SUCCESS,
    success,
  };
}

export function addItemError(error) {
  return {
    type: ADD_ITEM_ERROR,
    error,
  };
}
