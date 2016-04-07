/**
 * Test the loading selector
 */

import loadingSelector from '../loadingSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = loadingSelector();

describe('loadingSelector', () => {
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(selector(mockedState)).toEqual(loading);
  });
});
