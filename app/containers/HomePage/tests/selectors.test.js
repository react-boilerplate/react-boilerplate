import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHome,
  selectUsername,
} from '../selectors';

let currentSelector = selectHome();

describe('selectHome', () => {
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

currentSelector = selectUsername();

describe('selectUsername', () => {
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
