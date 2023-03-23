/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

// produce function of Immer library simplifies
// the process of writing immutable update logic, produce helps to avoid unknowingly change the state; takes two arguments first the current state and callback function,
import produce from 'immer';
import {
  LOAD_STR_SUCCESS,
  LOAD_STR,
  LOAD_STR_ERROR,
  ADD_NEW_STR,
  CHANGE_STRING,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  newStr: '',
  strData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_STR:
        draft.loading = true;
        draft.error = false;
        draft.strData.repositories = false;
        break;

      case LOAD_STR_SUCCESS:
        draft.strData.repositories = action.strlist;
        draft.loading = false;
        break;

      case LOAD_STR_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case ADD_NEW_STR:
        draft.strData.repositories = [
          {
            id:
              Math.max(...state.strData.repositories.map(item => item.id)) + 1,
            text: state.newStr,
          },
          ...state.strData.repositories,
        ];
        draft.newStr = '';
        break;

      case CHANGE_STRING:
        draft.newStr = action.newStr;
        break;
    }
  });

export default appReducer;
