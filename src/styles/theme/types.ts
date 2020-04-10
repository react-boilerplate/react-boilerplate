import { themes } from './themes';

export type ThemeKeyType = keyof typeof themes;
export interface ThemeState {
  selected: ThemeKeyType;
}
