import React, { Component, PropTypes } from 'react';

import {
  CardsContainer,
  CardWrapper,
  TextWrapper,
  CardHeader,
  CardText,
} from './styled';
import { Link } from '../common';

export default class CardList extends Component {
  static propTypes = {
    cardsArr: PropTypes.array.isRequired,
  };

  static truncateHeader = (header) => header.length > 65 ? `${header.substring(0, 65)}...` : header;

  static truncateDescription = (description) => `${description.substring(0, 130).replace(/"/g, '')}...`;

  setWidth = () => {
    const container = document.getElementById('cards-container');
    this.setState({ width: container.offsetWidth });
  }

  render() {
    return (
      <CardsContainer id="cards-container">
        {this.props.cardsArr.map((card) => (
          <Link to={`/books/${card.isbn}`} key={card.isbn}>
            <CardWrapper src={card.imgSrc}>
              <TextWrapper>
                <CardHeader>{CardList.truncateHeader(card.title)}</CardHeader>
                <CardText>{CardList.truncateDescription(card.description)}</CardText>
              </TextWrapper>
            </CardWrapper>
          </Link>
        ))}
      </CardsContainer>
    );
  }
}
