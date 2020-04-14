import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ThemeState, ThemeKeyType } from './types';
import { themes } from './themes';

export const initialState: ThemeState = {
  selected: 'default',
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
