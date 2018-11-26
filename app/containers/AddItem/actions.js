import { ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR } from './constants';

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

export function addItemSuccess() {
  return {
    type: ADD_ITEM_SUCCESS,
  };
}

export function addItemError() {
  return {
    type: ADD_ITEM_ERROR,
  };
}
