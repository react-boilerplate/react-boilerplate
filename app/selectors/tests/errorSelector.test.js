/**
 * Test the error selector
 */

import errorSelector from '../errorSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = errorSelector();

describe('errorSelector', () => {
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(selector(mockedState)).toEqual(error);
  });
});
