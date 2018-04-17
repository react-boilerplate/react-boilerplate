import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const selectBooks = () => createSelector(
  selectHome,
  (homeState) => homeState.get('books')
);

export {
  selectHome,
  selectBooks,
};
