/**
 * Test the loading selector
 */

import loadingSelector from '../loadingSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('loadingSelector', () => {
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});
