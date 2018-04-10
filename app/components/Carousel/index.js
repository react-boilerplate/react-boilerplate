import React, { Component } from 'react';
import debounce from 'lodash/debounce';

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

  static keys = {};

  state = {
    currentXPos: 0,
    nextXPos: 0,
    booksArr: books,
    currentIndex: 0,
  };

  componentWillMount() {
    this.performCarouselAction = debounce(this.performCarouselAction, 200);
  }

  handleClick = (evt) => {
    evt.persist();
    this.performCarouselAction(evt.target.name);
  }

  performCarouselAction = (leftOrRight) => {
    const { currentXPos, currentIndex } = this.state;
    const nextXPos = leftOrRight === 'left' ? currentXPos + 100 : currentXPos - 100;
    this.setState({ currentXPos, nextXPos, currentIndex: currentIndex + (leftOrRight === 'left' ? -1 : 1) }, () => {
      setTimeout(() => this.setState({ currentXPos: nextXPos }), 500);
    });
  }

  render() {
    const { booksArr, currentXPos, nextXPos, currentIndex } = this.state;
    return (
      <div>
        <ArrowContainer>
          <Arrow onClick={this.handleClick} name="left" src={ArrowLeft} visibility={currentIndex === 0 ? 'hidden' : 'visible'} />
          <Arrow onClick={this.handleClick} name="right" src={ArrowRight} visibility={currentIndex === booksArr.length - 1 ? 'hidden' : 'visible'} />
        </ArrowContainer>
        <CarouselContainer currentXPos={currentXPos} nextXPos={nextXPos}>
          {booksArr.map(({ src, backgroundSrc, quote1, quoteBy1, quote2, quoteBy2, quote3, quoteBy3 }) => (
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
