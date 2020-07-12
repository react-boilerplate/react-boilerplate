import { selectHome, makeSelectUsername } from '../selectors';
import { initialState } from '../slice';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = {
      username: '',
    };
    const mockedState = {
      home: homeState,
    };
    expect(selectHome(mockedState)).toEqual(homeState);
  });

  it("should return the initial state if home isn't defined", () => {
    expect(selectHome({})).toEqual(initialState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = {
      home: {
        username,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
