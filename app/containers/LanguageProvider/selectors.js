import { createSelector } from 'reselect';
import { prop } from 'ramda';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = prop('language');

/**
 * Select the language locale
 */

const makeSelectLocale = () => createSelector(selectLanguage, prop('locale'));

export { selectLanguage, makeSelectLocale };
