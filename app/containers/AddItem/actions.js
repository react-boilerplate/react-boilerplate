import { ADD_ITEM } from './constants';

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}
