import { fromJS } from 'immutable';
import expect from 'expect';

import {
  homeSelector,
  usernameSelector,
} from '../selectors';

let currentSelector = homeSelector();

describe('homeSelector', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(currentSelector(mockedState)).toEqual(homeState);
  });
});

currentSelector = usernameSelector();

describe('usernameSelector', () => {
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      home: {
        username,
      },
    });
    expect(currentSelector(mockedState)).toEqual(username);
  });
});
