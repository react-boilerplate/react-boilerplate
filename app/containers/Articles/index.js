import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectBooks } from '../App/selectors';

const BookPage = () => (
  <div>
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
