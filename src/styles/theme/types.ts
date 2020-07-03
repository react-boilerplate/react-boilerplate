import { themes } from './themes';

export type ThemeKeyType = keyof typeof themes | 'system';

export interface ThemeState {
  selected: ThemeKeyType;
}
