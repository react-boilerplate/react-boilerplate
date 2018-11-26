import { fromJS } from 'immutable';
import displayItemsReducer from '../reducer';

describe('displayItemsReducer', () => {
  it('returns the initial state', () => {
    expect(displayItemsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
