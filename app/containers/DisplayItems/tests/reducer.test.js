import { fromJS } from 'immutable';
import displayItemsReducer from '../reducer';
import { getItemsSuccess } from '../actions';

describe('displayItemsReducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = fromJS({
      items: [],
    });
  });

  it('should return initial state when actions to not match', () => {
    expect(displayItemsReducer(undefined, {})).toMatchSnapshot();
  });

  it('should properly handle getItemsSuccess action', () => {
    const sampleItems = ['item 1', 'item 2', 'item 3'];
    expect(
      displayItemsReducer(initialState, getItemsSuccess(sampleItems)),
    ).toMatchSnapshot();
  });
});
