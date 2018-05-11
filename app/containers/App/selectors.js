import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

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

const selectSelectedBook = () => createSelector(
  selectHome,
  (homeState) => homeState.get('selectedBook').toJS()
);

const selectAuthor = () => createSelector(
  selectHome,
  (homeState) => homeState.get('author').toJS()
);

const selectArticles = () => createSelector(
  selectHome,
  (homeState) => homeState.get('articles').toJS()
);

export {
  makeSelectLocation,
  selectHome,
  selectBooks,
  selectPraise,
  selectDescription,
  selectSelectedBook,
  selectAuthor,
  selectArticles,
};
