import { createSlice } from '@reduxjs/toolkit';
import appReducer from './reducer';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadRepos(state, action) {
      state.loading = true;
      state.error = false;
      state.userData.repositories = false;
    },
    reposLoaded(state, action) {
      const { repos, username } = action.payload;
      state.userData.repositories = repos;
      state.loading = false;
      state.currentUser = username;
    },
    repoLoadingError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loadRepos, reposLoaded, repoLoadingError } = appSlice.actions;

export default appReducer;
