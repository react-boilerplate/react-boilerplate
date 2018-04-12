import React, { PropTypes } from 'react';

import {
  CarouselItemContainer,
  BookContainer,
  QuotesContainer,
  QuoteWrapper,
  Book,
  Quote,
  QuoteBy,
} from './styled';

const CarouselItem = ({ src, backgroundSrc, quote1, quoteBy1, quote2, quoteBy2, quote3, quoteBy3 }) => (
  <CarouselItemContainer background={backgroundSrc}>
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
  </CarouselItemContainer>
);

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  backgroundSrc: PropTypes.string.isRequired,
  quote1: PropTypes.string.isRequired,
  quoteBy1: PropTypes.string.isRequired,
  quote2: PropTypes.string.isRequired,
  quoteBy2: PropTypes.string.isRequired,
  quote3: PropTypes.string.isRequired,
  quoteBy3: PropTypes.string.isRequired,
};

export default CarouselItem;
