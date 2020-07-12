/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE } from '../../locales';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = produce((draft, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      draft.locale = action.locale;
      break;
  }
}, initialState);

export default languageProviderReducer;
