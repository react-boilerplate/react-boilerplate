/*
 *
 * ThemePicker actions
 *
 */

import {
  CHANGE_THEME,
} from './constants';

export function changeTheme(theme) {
  return {
    type: CHANGE_THEME,
    theme,
  };
}
