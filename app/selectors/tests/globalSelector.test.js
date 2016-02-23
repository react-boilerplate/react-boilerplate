/**
 * Test the global selector
 */

import globalSelector from '../globalSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('globalSelector', () => {
  it('should select the global state', () => {
    const globalState = fromJS({
      userData: {}
    });
    const mockedState = fromJS({
      global: globalState
    });
    expect(globalSelector(mockedState)).toEqual(globalState);
  });
});
