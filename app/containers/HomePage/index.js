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

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Container, ContentWrapper } from './styled';
import Carousel from '../../components/Carousel';
import CarouselItem from '../../components/CarouselItem';
import Author from '../../components/Author';
import { selectBooks } from '../../containers/App/selectors';

const HomePage = ({ books }) => (
  <Container>
    <Carousel carouselArr={books} CarouselItem={CarouselItem} carouselHeight={500} slideTime={0.5} arrowOffset={330} />
    <ContentWrapper>
      <Author />
    </ContentWrapper>
  </Container>
);

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(HomePage);
