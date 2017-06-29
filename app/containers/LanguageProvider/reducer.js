/*
 *
 * LanguageProvider reducer
 *
 */

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../App/constants';

const initialState = {
  locale: DEFAULT_LOCALE,
};

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { ...state, locale: action.locale };
    default:
      return state;
  }
}

export default languageProviderReducer;
