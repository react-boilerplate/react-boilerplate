import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import BooksList from '../../components/CardList';
import { selectBooks } from '../App/selectors';

class BookListPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div>
        <BooksList cardsArr={this.props.books} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});


const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(BookListPage);
