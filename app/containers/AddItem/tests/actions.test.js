import { addItem } from '../actions';
import { ADD_ITEM } from '../constants';

describe('AddItem actions', () => {
  describe('addItem Action', () => {
    it('has a type of ADD_ITEM', () => {
      const expected = {
        type: ADD_ITEM,
      };
      expect(addItem()).toEqual(expected);
    });
  });
});
