/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

import { LOAD_MESSAGES, LOADING_MESSAGES } from './constants';
import { DEFAULT_LOCALE } from '../../locales';
import { defaultMessages } from '../../i18n';
export const initialState = {
  locale: DEFAULT_LOCALE,
  messages: defaultMessages,
  updatingInProgress: false,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = produce((draft, action) => {
  switch (action.type) {
    // case CHANGE_LOCALE:
    // if locale is updated before messages are fetched, a ton of errors get
    // printed to the console for 'Missing message'.  Instead, this is handled
    // by the saga after loading the messages.
    // break;
    case LOADING_MESSAGES:
      draft.updatingInProgress = true;
      break;
    case LOAD_MESSAGES:
      draft.messages = action.messages;
      draft.locale = action.locale;
      draft.updatingInProgress = false;
      break;
  }
}, initialState);

export default languageProviderReducer;
