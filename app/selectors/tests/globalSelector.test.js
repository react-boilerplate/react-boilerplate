/**
 * Test the global selector
 */

import globalSelector from '../globalSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = globalSelector();

describe('globalSelector', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selector(mockedState)).toEqual(globalState);
  });
});
