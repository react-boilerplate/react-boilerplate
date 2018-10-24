import { fromJS } from 'immutable';

import { selectHome, makeSelectUsername } from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      home: {
        username,
      },
    });
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
