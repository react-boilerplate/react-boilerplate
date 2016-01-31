import { AUTH_SUCCESS, AUTH_ERROR } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: false,
  userData: {}
});

function formReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      console.log('reducer success');
      return state.set('authenticated', true).set('userData', action.data);
    case AUTH_ERROR:
      return state.set('authenticated', false);
    default:
      return state;
  }
}

export default formReducer;
