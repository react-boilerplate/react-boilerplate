import { GET_ITEMS, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR } from './constants';

export function getItems() {
  console.log('Get items got triggered!');
  return {
    type: GET_ITEMS,
  };
}

export function getItemsSuccess(items) {
  return {
    type: GET_ITEMS_SUCCESS,
    items,
  };
}

export function getItemsError() {
  return {
    type: GET_ITEMS_ERROR,
  };
}
