
import { fromJS } from 'immutable';
import themePickerReducer from '../reducer';

describe('themePickerReducer', () => {
  it('returns the initial state', () => {
    expect(themePickerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
