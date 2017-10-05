/*
 *
 * ThemePicker reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_THEME,
} from './constants';

const initialState = fromJS({
  main: '#3CB371',
  secondary: '#FFF',
});

function themePickerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return state.set('main', action.theme);
    default:
      return state;
  }
}

export default themePickerReducer;
