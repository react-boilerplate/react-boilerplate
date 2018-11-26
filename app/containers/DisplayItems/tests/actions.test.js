import { getItems } from '../actions';
import { GET_ITEMS } from '../constants';

describe('DisplayItems actions', () => {
  describe('Get Items Action', () => {
    it('has a type of GET_ITEMS', () => {
      const expected = {
        type: GET_ITEMS,
      };
      expect(getItems()).toEqual(expected);
    });
  });
});
