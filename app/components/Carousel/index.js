import React, { Component } from 'react';

import {
  CarouselContainer,
  ArrowContainer,
  Arrow,
  CarouselItem,
  BookContainer,
  QuotesContainer,
  QuoteWrapper,
  Book,
  Quote,
  QuoteBy,
} from './styled';
import ArrowLeft from '../../images/arrow-left.svg';
import ArrowRight from '../../images/arrow-right.svg';
import books from './books';

export default class Carousel extends Component {
  static propTypes = {};

  static leftCheck = (index) => index <= -1 ? books.length - 1 : index;

  static rightCheck = (index) => index >= books.length ? 0 : index;

  state = {
    currentBookIndex: 0,
  };

  performCarouselAction = ({ target }) => {
    const { name } = target;
    const { currentBookIndex } = this.state;
    const updatedBookIndex = currentBookIndex + (name === 'left' ? -1 : 1);
    this.setState({ currentBookIndex: Carousel[`${name}Check`](updatedBookIndex) });
  }

  render() {
    return (
      <div>
        <ArrowContainer>
          <Arrow onClick={this.performCarouselAction} name="left" src={ArrowLeft} />
          <Arrow onClick={this.performCarouselAction} name="right" src={ArrowRight} />
        </ArrowContainer>
        <CarouselContainer>
          {books.map(({ src, backgroundSrc, quote1, quoteBy1, quote2, quoteBy2, quote3, quoteBy3 }) => (
            <CarouselItem key={src} background={backgroundSrc}>
              <BookContainer>
                <Book src={src} />
              </BookContainer>
              <QuotesContainer>
                <QuoteWrapper>
                  <Quote>{quote1}</Quote>
                  <QuoteBy>{quoteBy1}</QuoteBy>
                </QuoteWrapper>
                <QuoteWrapper>
                  <Quote>{quote2}</Quote>
                  <QuoteBy>{quoteBy2}</QuoteBy>
                </QuoteWrapper>
                <QuoteWrapper>
                  <Quote>{quote3}</Quote>
                  <QuoteBy>{quoteBy3}</QuoteBy>
                </QuoteWrapper>
              </QuotesContainer>
            </CarouselItem>))}
        </CarouselContainer>
      </div>
    );
  }
}
