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

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { HomePageState } from './types';
import { Repo } from 'types/Repo';

// The initial state of the homepage container
export const initialState: HomePageState = {
  username: '',
  repositories: [],
  loading: false,
  error: false,
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      // Delete prefixed '@' from the github username
      const username = action.payload.replace(/@/gi, '');
      state.username = username;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = false;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoLoadingError(state) {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = homepageSlice;
