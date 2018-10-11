import { createSelector } from 'reselect';

/**
 * Direct selector to the language domain
 */

const selectLanguage = state => state.language;

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.locale);

export { selectLanguage, makeSelectLocale };
