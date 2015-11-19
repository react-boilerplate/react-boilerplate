import { CHANGE_OWNER_NAME, CHANGE_PROJECT_NAME } from '../constants/AppConstants';

export function asyncChangeProjectName(name) {
  return function(dispatch) {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeProjectName(name));
  }
}

export function asyncChangeOwnerName(name) {
  return function(dispatch) {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeOwnerName(name));
  }
}

function changeProjectName(name) {
  return { type: CHANGE_PROJECT_NAME, name };
}

function changeOwnerName(name) {
  return { type: CHANGE_OWNER_NAME, name };
}
