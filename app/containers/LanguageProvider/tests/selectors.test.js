import {
  selectLanguage,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('selectLanguage', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      language: globalState,
    });
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});
