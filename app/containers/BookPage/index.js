import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Book from '../../components/Book';
import { selectBooks } from '../App/selectors';

const BookPage = ({ books, match }) => (
  <div>
    <Book selectedBook={books.filter((book) => book.isbn === match.params.isbn)[0]} />
  </div>
);

BookPage.propTypes = {
  books: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(BookPage);
