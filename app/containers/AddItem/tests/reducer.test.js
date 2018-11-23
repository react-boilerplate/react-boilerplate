import { fromJS } from 'immutable';
import addItemReducer from '../reducer';

describe('addItemReducer', () => {
  it('returns the initial state', () => {
    expect(addItemReducer(undefined, {})).toEqual(fromJS({}));
  });
});
