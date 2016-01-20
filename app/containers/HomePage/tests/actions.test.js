import expect from 'expect';
import rewire from 'rewire';

const AppActions = rewire('../actions');
const changeOwnerName = AppActions.__get__('changeOwnerName');
const changeProjectName = AppActions.__get__('changeProjectName');
import { CHANGE_OWNER_NAME, CHANGE_PROJECT_NAME } from '../constants';

// Test actions from AppActions.js
describe('AppActions', () => {
  // Test changeOwnerName action
  describe('changeOwnerName', () => {
    it('should change the owner name', () => {
      const name = 'samsmith';
      const expectedResult = {
        type: CHANGE_OWNER_NAME,
        name
      };

      expect(changeOwnerName(name)).toEqual(expectedResult);
    });
  });

  // Test changeProjectName action
  describe('changeProjectName', () => {
    it('should change the project name', () => {
      const name = 'Webapplication Boilerplate';
      const expectedResult = {
        type: CHANGE_PROJECT_NAME,
        name
      };

      expect(changeProjectName(name)).toEqual(expectedResult);
    });
  });
});
