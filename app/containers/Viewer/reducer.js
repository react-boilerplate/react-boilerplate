import { fromJS } from 'immutable';
import { SET_VIEWER, LOGOUT } from './constants';

export const GIVEN_NAME = 'givenName';
export const FAMILY_NAME = 'name';
export const NAME = 'name';
export const PICTURE = 'picture';

const initialState = fromJS({});

function viewerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIEWER:
      return state
        .set(GIVEN_NAME, action.viewer.given_name)
        .set(FAMILY_NAME, action.viewer.family_name)
        .set(NAME, action.viewer.name)
        .set(PICTURE, action.viewer.picture);
    case LOGOUT:
      return state.clear();
    default:
      return state;
  }
}

export default viewerReducer;
