import React from 'react';

import BooksList from '../../components/CardList';
import books from '../../utils/books';

export default class BookListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <BooksList cardsArr={books} />
      </div>
    );
  }
}
