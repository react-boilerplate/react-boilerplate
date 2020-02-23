import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the language domain
 */

const selectLanguage = state => state.language || initialState;

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.locale);

const makeSelectMessages = () =>
  createSelector(selectLanguage, languageState => languageState.messages);

export { selectLanguage, makeSelectLocale, makeSelectMessages };
