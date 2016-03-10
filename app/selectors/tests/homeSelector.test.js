/**
 * Test the home selector
 */

import homeSelector from '../homeSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('homeSelector', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(homeSelector(mockedState)).toEqual(homeState);
  });
});
