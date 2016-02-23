import usernameSelector from '../usernameSelector';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('usernameSelector', () => {
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      global: {
        userData: {
          username
        }
      }
    });
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
