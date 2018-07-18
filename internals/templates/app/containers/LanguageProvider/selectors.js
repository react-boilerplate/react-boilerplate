import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => state.get('language', initialState);

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.get('locale'));

export { selectLanguage, makeSelectLocale };
