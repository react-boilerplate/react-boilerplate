import { ThemeKeyType } from './types';

export const isSysyemDark = window?.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')?.matches
  : undefined;

export function saveTheme(theme: ThemeKeyType) {
  if (window.localStorage) {
    localStorage.setItem('selectedTheme', theme);
  }
}
export function getThemeFromStorage(): ThemeKeyType | null {
  return window.localStorage
    ? (localStorage.getItem('selectedTheme') as ThemeKeyType) || null
    : null;
}
