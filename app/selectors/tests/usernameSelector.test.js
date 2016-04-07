/**
 * Test the username selector
 */

import usernameSelector from '../usernameSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = usernameSelector();

describe('usernameSelector', () => {
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      home: {
        username,
      },
    });
    expect(selector(mockedState)).toEqual(username);
  });
});
