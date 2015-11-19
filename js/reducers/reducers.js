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
 */

import { CHANGE_OWNER_NAME, CHANGE_PROJECT_NAME } from '../constants/AppConstants';
const assign = Object.assign || require('object.assign');

const initialState = {
  projectName: 'React.js Boilerplate',
  ownerName: 'mxstbr'
};

export function homeReducer(state = initialState, action) {
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
