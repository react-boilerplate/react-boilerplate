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

import React from 'react';
// import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import Carousel from '../../components/Carousel';
import books from '../../utils/books';
import CarouselItem from '../../components/CarouselItem';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Carousel carouselArr={books} CarouselItem={CarouselItem} carouselHeight={600} slideTime={0.5} arrowOffset={380} />
    );
  }
}
