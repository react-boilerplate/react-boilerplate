import { CHANGE_USERNAME, LOAD_REPOS_SUCCESS } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  userData: fromJS({
    repositories: false,
    username: ''
  })
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete '@'
      const name = action.name.replace(/@/gi, '');
      return state.setIn(['userData', 'username'], name);
    case LOAD_REPOS_SUCCESS:
      return state.setIn(['userData', 'repositories'], action.repos);
    default:
      return state;
  }
}

export default globalReducer;
