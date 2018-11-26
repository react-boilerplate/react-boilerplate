import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the displayItems state domain
 */

const selectDisplayItemsDomain = state =>
  state.get('displayItems', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DisplayItems
 */

const makeSelectDisplayItems = () =>
  createSelector(selectDisplayItemsDomain, substate => substate.toJS());

export default makeSelectDisplayItems;
export { selectDisplayItemsDomain };
