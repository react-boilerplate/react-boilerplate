/*
 * HomePage Slice
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

// The initial state of the HomePage container
export const initialState = {
  username: '',
};

const homePageSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeUsername(state, action) {
      // Delete prefixed '@' from the github username
      const username = action.payload.username.replace(/@/gi, '');
      state.username = username;
    },
  },
});

export const { changeUsername } = homePageSlice.actions;

export const { reducer } = homePageSlice;
