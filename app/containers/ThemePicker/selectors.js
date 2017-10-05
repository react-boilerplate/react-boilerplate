import { createSelector } from 'reselect';

/**
 * Direct selector to the themePicker state domain
 */
const selectThemePickerDomain = (state) => state.get('theme');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ThemePicker
 */

const makeSelectThemePicker = () => createSelector(
  selectThemePickerDomain,
  (substate) => substate.toJS()
);

export default makeSelectThemePicker;
export {
  selectThemePickerDomain,
};
