import { CHANGE_OWNER_NAME, CHANGE_PROJECT_NAME } from '../constants/AppConstants';
import assign from 'react/lib/Object.assign';

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
