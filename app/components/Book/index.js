import React, { PropTypes } from 'react';

import {
  BookContainer,
  HeaderWrapper,
  BookImage,
} from './styled';

const Book = ({ selectedBook }) => (
  <BookContainer>
    <HeaderWrapper>
      <BookImage src={selectedBook.imgSrc} />
    </HeaderWrapper>
  </BookContainer>
);

Book.propTypes = {
  selectedBook: PropTypes.object.isRequired,
};

export default Book;
