/**
 * Test the currentUser selector
 */

import currentUserSelector from '../currentUserSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('currentUserSelector', () => {
  it('should select the current user', () => {
    const currentUser = 'mxstbr';
    const mockedState = fromJS({
      global: {
        currentUser
      }
    });
    expect(currentUserSelector(mockedState)).toEqual(currentUser);
  });
});
