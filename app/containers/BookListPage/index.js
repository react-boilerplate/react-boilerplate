import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import BooksList from '../../components/CardList';
import { selectBooks } from '../App/selectors';
import { deleteBook } from '../App/actions';

class BookListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <BooksList cardsArr={this.props.books} handleDelete={this.props.handleDeleteClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});

const mapDispatchToProps = (dispatch) => ({
  handleDeleteClick: (id) => dispatch(deleteBook(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(BookListPage);
