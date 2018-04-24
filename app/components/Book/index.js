import React, { PropTypes } from 'react';

import {
  BookContainer,
  HeaderWrapper,
  BookWrapper,
  BookImage,
  HeaderTextWrapper,
  HeaderText,
  HeaderSubText,
  Description,
} from './styled';

const Book = ({ selectedBook }) => (
  <BookContainer>
    <HeaderWrapper>
      <BookWrapper>
        <BookImage src={selectedBook.imgSrc} />
      </BookWrapper>
      <HeaderTextWrapper>
        <HeaderText>{selectedBook.title}</HeaderText>
        <HeaderSubText>{selectedBook.subtitle}</HeaderSubText>
      </HeaderTextWrapper>
    </HeaderWrapper>
    <Description>{selectedBook.description}</Description>
  </BookContainer>
);

Book.propTypes = {
  selectedBook: PropTypes.object.isRequired,
};

export default Book;
