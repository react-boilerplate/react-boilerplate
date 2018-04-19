import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const selectBooks = () => createSelector(
  selectHome,
  (homeState) => homeState.get('books').toJS()
);

const selectPraise = () => createSelector(
  selectHome,
  (homeState) => homeState.get('praise').toJS()
);

const selectDescription = () => createSelector(
  selectHome,
  (homeState) => homeState.get('description').toJS()
);

export {
  selectHome,
  selectBooks,
  selectPraise,
  selectDescription,
};
