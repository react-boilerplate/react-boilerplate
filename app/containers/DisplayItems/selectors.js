import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDisplayItemsDomain = state =>
  state.get('displayItems', initialState);

const makeSelectDisplayItems = () =>
  createSelector(selectDisplayItemsDomain, substate => substate.toJS());

const itemsSelector = () =>
  createSelector(selectDisplayItemsDomain, substate => substate.get('items'));

const successSelector = () =>
  createSelector(selectDisplayItemsDomain, substate => substate.get('success'));

const errorSelector = () =>
  createSelector(selectDisplayItemsDomain, substate => substate.get('error'));

export default makeSelectDisplayItems;
export {
  selectDisplayItemsDomain,
  itemsSelector,
  successSelector,
  errorSelector,
};
