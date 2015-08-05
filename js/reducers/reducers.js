import { DEFAULT_ACTION } from '../constants/AppConstants';
import assign from 'react/lib/Object.assign';

const initialState = {
  someVariable: true
};

export function defaultApp(state = initialState, action) {
  switch (action.type) {
  case DEFAULT_ACTION:
    return assign({}, state, {
      someVariable: action.elem
    });
  default:
    return state;
  }
}
