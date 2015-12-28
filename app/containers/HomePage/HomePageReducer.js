/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

import { CHANGE_OWNER_NAME, CHANGE_PROJECT_NAME } from './HomePageConstants';
const assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

const initialState = {
  projectName: 'React.js Boilerplate',
  ownerName: 'mxstbr'
};

function homeReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case CHANGE_OWNER_NAME:
      return assign({}, state, {
        ownerName: action.name
      });
    case CHANGE_PROJECT_NAME:
      return assign({}, state, {
        projectName: action.name
      });
    default:
      return state;
  }
}

export default homeReducer;
