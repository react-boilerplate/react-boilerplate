/*
 * ReposManager Slice
 *
 * Here we define:
 * - The shape of our container's slice of Redux store,
 * - All the actions which can be triggered for this slice, including their effects on the store.
 *
 * Note that, while we are using dot notation in our reducer, we are not actually mutating the state
 * manually. Under the hood, we use immer to apply these updates to a new copy of the state.
 * Please see https://immerjs.github.io/immer/docs/introduction for more information.
 *
 */

import { createSlice } from '@reduxjs/toolkit';

// The initial state of the ReposManager container
export const initialState = {
  repositories: [],
  loading: false,
  error: false,
};

const reposManagerSlice = createSlice({
  name: 'reposManager',
  initialState,
  reducers: {
    loadRepos(state) {
      state.loading = true;
      state.error = false;
      state.repositories = [];
    },
    reposLoaded(state, action) {
      const { repos } = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoLoadingError(state) {
      state.error = true;
      state.loading = false;
    },
  },
});

export const {
  loadRepos,
  reposLoaded,
  repoLoadingError,
} = reposManagerSlice.actions;

export const { reducer } = reposManagerSlice;
