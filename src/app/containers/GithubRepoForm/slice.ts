/*
 * GithubRepoForm Slice
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
import { ContainerState, RepoErrorType } from './types';
import { Repo } from 'types/Repo';

// The initial state of the GithubRepoForm container
export const initialState: ContainerState = {
  username: 'react-boilerplate',
  repositories: [],
  loading: false,
  error: null,
};

const githubRepoFormSlice = createSlice({
  name: 'githubRepoForm',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = githubRepoFormSlice;
