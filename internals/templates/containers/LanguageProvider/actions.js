/*
 *
 * LanguageProvider actions
 *
 */

import { CHANGE_LOCALE, LOAD_MESSAGES, LOADING_MESSAGES } from './constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

export function loadMessages({ locale, messages }) {
  return {
    type: LOAD_MESSAGES,
    locale,
    messages,
  };
}

export function loadingMessages() {
  return {
    type: LOADING_MESSAGES,
  };
}
