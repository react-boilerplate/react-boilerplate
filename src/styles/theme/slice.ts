import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ThemeState, ThemeKeyType } from './types';
import { themes } from './themes';
import { getThemeFromStorage, isSysyemDark } from './utils';

export const initialState: ThemeState = {
  selected: getThemeFromStorage() || 'default',
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
  theme => {
    if (theme.selected === 'system') {
      return isSysyemDark ? themes.dark : themes.default;
    }
    return themes[theme.selected];
  },
);

export const selectThemeKey = createSelector(
  [(state: { theme: ThemeState }) => state.theme || initialState],
  theme => theme.selected,
);

export const { changeTheme } = themeSlice.actions;
export const reducer = themeSlice.reducer;
export const themeSliceKey = themeSlice.name;
