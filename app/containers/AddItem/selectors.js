import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddItemDomain = state => state.get('addItem', initialState);

const makeSelectAddItem = () =>
  createSelector(selectAddItemDomain, substate => substate.toJS());

const itemSelector = () =>
  createSelector(selectAddItemDomain, substate => substate.get('item'));

const successSelector = () =>
  createSelector(selectAddItemDomain, substate => substate.get('success'));

const errorSelector = () =>
  createSelector(selectAddItemDomain, substate => substate.get('error'));

export default makeSelectAddItem;
export { selectAddItemDomain, itemSelector, successSelector, errorSelector };
