import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddItemDomain = state => state.get('addItem', initialState);

const makeSelectAddItem = () =>
  createSelector(selectAddItemDomain, substate => substate.toJS());

const addItemSelector = () =>
  createSelector(selectAddItemDomain, substate => substate.get('item'));

export default makeSelectAddItem;
export { selectAddItemDomain, addItemSelector };
