/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './sagas';
import { selectBooks } from './selectors';
import { getBooks } from './actions';
import { Container } from './styled';
import Carousel from '../../components/Carousel';
import CarouselItem from '../../components/CarouselItem';

class HomePage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    dispatchGetBooks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatchGetBooks();
  }

  render() {
    return (
      <Container>
        <Carousel carouselArr={this.props.books} CarouselItem={CarouselItem} carouselHeight={600} slideTime={0.5} arrowOffset={380} />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetBooks: () => dispatch(getBooks()),
});

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
