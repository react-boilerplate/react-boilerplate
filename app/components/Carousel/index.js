import React, { Component } from 'react';

import { CarouselContainer, ArrowContainer, Arrow, CarouselItem, BookContainer, QuoteContainer } from './styled';
import ArrowLeft from '../../images/arrow-left.svg';
import ArrowRight from '../../images/arrow-right.svg';

export default class extends Component {
  static propTypes = {};

  state = {};

  render() {
    return (
      <CarouselContainer>
        <ArrowContainer>
          <Arrow src={ArrowLeft} />
          <Arrow src={ArrowRight} />
        </ArrowContainer>
        <CarouselItem>
          <BookContainer />
          <QuoteContainer />
        </CarouselItem>
      </CarouselContainer>
    );
  }
}
