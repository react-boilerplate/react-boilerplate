import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';

import {
  CarouselItemContainer,
  BookContainer,
  QuotesContainer,
  QuoteWrapper,
  Book,
  Quote,
  QuoteBy,
} from './styled';

class CarouselItem extends Component {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    praise: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = { windowWidth: window.innerWidth }

  componentDidMount() {
    window.addEventListener('resize', this.setWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWindowWidth);
  }

  setWindowWidth = () => this.setState({ windowWidth: window.innerWidth });

  handleBookClick = (id) => this.props.history.push(`/books/${id}`);

  /* eslint-disable no-extra-boolean-cast */
  render() {
    const { _id, imgSrc, praise, description } = this.props;
    const { windowWidth } = this.state;
    const { length } = description;
    let substringCutoff = length > 300 ? length - 100 : length;
    if (windowWidth <= 1200) substringCutoff = length / 2;
    if (windowWidth <= 900) substringCutoff = length / 3;
    if (windowWidth <= 600) substringCutoff = 250;
    if (windowWidth <= 400) substringCutoff = 100;
    return (
      <CarouselItemContainer>
        <BookContainer onClick={() => this.handleBookClick(_id)}>
          <Book src={imgSrc} />
        </BookContainer>
        {!!praise.length ? <QuotesContainer>
          <QuoteWrapper>
            <Quote>{praise[0].quote}</Quote>
            <QuoteBy>{praise[0].quoteBy}</QuoteBy>
          </QuoteWrapper>
          {windowWidth > 970 && <QuoteWrapper>
            <Quote>{praise[1].quote}</Quote>
            <QuoteBy>{praise[1].quoteBy}</QuoteBy>
          </QuoteWrapper>}
        </QuotesContainer> :
        <QuotesContainer>
          <Quote>{`${description.substring(0, substringCutoff)}...`}</Quote>
        </QuotesContainer>}
      </CarouselItemContainer>
    );
  }
}

export default withRouter(CarouselItem);
