/**
 * Test the error selector
 */

import errorSelector from '../errorSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('errorSelector', () => {
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      home: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});
