/*
 *
 * LanguageProvider reducer
 *
 */

import { combineReducers } from 'redux-immutable';

import {
  CHANGE_LOCALE,
} from './constants';

import {
  DEFAULT_LOCALE,
} from '../App/constants';

function locale(state = DEFAULT_LOCALE, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return action.locale;
    default:
      return state;
  }
}

export default combineReducers({
  locale,
});
