import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ThemeState, ThemeKeyType } from './types';
import { themes } from './themes';

const isSysyemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const initialState: ThemeState = {
  selected: isSysyemDark ? 'dark' : 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.selected = action.payload;
    },
  },
});

export const selectTheme = createSelector(
  [(state: { theme: ThemeState }) => state.theme || initialState],
  theme => themes[theme.selected],
);

export const { changeTheme } = themeSlice.actions;
export const reducer = themeSlice.reducer;
export const themeSliceKey = themeSlice.name;
