import * as actions from '../actions';
import { ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR } from '../constants';

describe('AddItem actions', () => {
  describe('add item action', () => {
    it('has a type of ADD_ITEM', () => {
      const expected = {
        type: ADD_ITEM,
      };
      expect(actions.addItem()).toEqual(expected);
    });
  });

  describe('add item success action', () => {
    it('has a type of ADD_ITEM_SUCCESS', () => {
      const expected = {
        type: ADD_ITEM_SUCCESS,
      };
      expect(actions.addItemSuccess()).toEqual(expected);
    });
  });

  describe('add item error action', () => {
    it('has a type of ADD_ITEM_ERROR', () => {
      const expected = {
        type: ADD_ITEM_ERROR,
      };
      expect(actions.addItemError()).toEqual(expected);
    });
  });
});
