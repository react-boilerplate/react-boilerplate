/**
 * Test the home selector
 */

import homeSelector from '../homeSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

const selector = homeSelector();

describe('homeSelector', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selector(mockedState)).toEqual(homeState);
  });
});
