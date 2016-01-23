import expect from 'expect';
import * as constants from '../constants';
import homeReducer from '../reducer';

const initialState = homeReducer.__get__('initialState');

// Test Reducer
describe('defaultReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(initialState);
  });

  // Test that it handles changing the owner correctly
  it('should handle the CHANGE_OWNER_NAME action', () => {
    const name = 'samsmith';

    expect(
      homeReducer({}, {
        type: constants.CHANGE_OWNER_NAME,
        name
      })
    ).toEqual({
      ownerName: name
    });
  });

  // Test that it handles changing the project name correctly
  it('should handle the CHANGE_PROJECT_NAME action', () => {
    const name = 'Webapplication Boilerplate';

    expect(
      homeReducer({}, {
        type: constants.CHANGE_PROJECT_NAME,
        name
      })
    ).toEqual({
      projectName: name
    });
  });
});
