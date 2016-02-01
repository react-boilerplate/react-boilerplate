import { AUTH_SUCCESS, AUTH_ERROR, REPOS_LOADED } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: false,
  userData: fromJS({
    repositories: []
  })
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return state.set('authenticated', true).set('userData', action.data);
    case AUTH_ERROR:
      return state.set('authenticated', false);
    case REPOS_LOADED:
      return state.setIn(['userData', 'repositories'], action.repos);
    default:
      return state;
  }
}

export default globalReducer;
