/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

/** ----  Vault Vision changed code block ---- */
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  AUTH_SUCCESS,
  LOAD_USER_SUCCESS,
  VALIDATE_AUTH_CALLBACK,
  LOAD_USER,
  VALIDATE_AUTH_ERROR,
} from './constants';

// Added a user object and userLoading flag to global state
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  user: null,
  userLoading: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case VALIDATE_AUTH_CALLBACK:
      case LOAD_USER:
        draft.userLoading = true;
        break;
      case AUTH_SUCCESS:
      case LOAD_USER_SUCCESS:
        console.log('action.user');
        console.log(action.user);
        draft.user = action.user;
        draft.userLoading = false;
        break;
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case VALIDATE_AUTH_ERROR:
        draft.error = action.error;
        draft.userLoading = false;
        console.log(action.error);
        break;
    }
  });

export default appReducer;
/** ---- end block ----  */
