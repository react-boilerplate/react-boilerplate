import React, { Component, PropTypes } from 'react';

import {
  CardsContainer,
  CardWrapper,
  TextWrapper,
  CardHeader,
  CardText,
} from './styled';

export default class CardList extends Component {
  static propTypes = {
    cardsArr: PropTypes.array.isRequired,
  };

  static truncateHeader = (header) => header.length > 65 ? `${header.substring(0, 65)}...` : header;

  static truncateDescription = (description) => `${description.substring(0, 130).replace(/"/g, '')}...`;

  state = {};

  render() {
    return (
      <CardsContainer>
        {this.props.cardsArr.map((card) => (
          <CardWrapper key={card.imgSrc} src={card.imgSrc}>
            <TextWrapper>
              <CardHeader>{CardList.truncateHeader(card.title)}</CardHeader>
              <CardText>{CardList.truncateDescription(card.description)}</CardText>
            </TextWrapper>
          </CardWrapper>
        ))}
      </CardsContainer>
    );
  }
}
