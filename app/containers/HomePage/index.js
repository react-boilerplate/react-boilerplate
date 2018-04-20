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

import { Container } from './styled';
import Carousel from '../../components/Carousel';
import CarouselItem from '../../components/CarouselItem';

const HomePage = ({ books }) => (
  <Container>
    <Carousel carouselArr={books} CarouselItem={CarouselItem} carouselHeight={600} slideTime={0.5} arrowOffset={380} />
  </Container>
);

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
};
