import React, { PropTypes, Component } from 'react';

import {
  BookContainer,
  HeaderWrapper,
  BookWrapper,
  BookImage,
  HeaderTextWrapper,
  HeaderText,
  HeaderSubText,
  DescriptionContainer,
  Description,
  PraiseContainer,
  PraiseHeader,
  QuoteContainer,
  Quote,
  QuoteBy,
  Hyperlink,
} from './styled';

class Book extends Component {
  static propTypes = {
    selectedBook: PropTypes.object.isRequired,
  };

  state = {
    praiseOpen: false,
  }

  togglePraise = () => this.setState({ praiseOpen: !this.state.praiseOpen });

  render() {
    const { selectedBook } = this.props;
    return (
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
        <DescriptionContainer>
          <Description>{selectedBook.description}</Description>
        </DescriptionContainer>
        {!!selectedBook.praise.length && <PraiseContainer>
          <PraiseHeader>Praise</PraiseHeader>
          {selectedBook.praise.slice(0, this.state.praiseOpen ? selectedBook.praise.length : 6).map((praiseItem) => (
            <QuoteContainer key={praiseItem.quoteBy}>
              <Quote>{praiseItem.quote}</Quote>
              <QuoteBy>{praiseItem.quoteBy}</QuoteBy>
            </QuoteContainer>
          ))}
          <Hyperlink onClick={this.togglePraise}>{this.state.praiseOpen ? 'See less' : 'See more'}</Hyperlink>
        </PraiseContainer>}
      </BookContainer>
    );
  }
}

export default Book;
