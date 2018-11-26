import { addItem } from '../actions';
import { ADD_ITEM } from '../constants';

describe('AddItem actions', () => {
  describe('add item action', () => {
    it('has a type of ADD_ITEM', () => {
      const expected = {
        type: ADD_ITEM,
      };
      expect(addItem()).toEqual(expected);
    });
  });
});
