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

  state = {};

  render() {
    return (
      <CardsContainer>
        {this.props.cardsArr.map((card) => (
          <CardWrapper key={card.src} src={card.src}>
            <TextWrapper>
              <CardHeader>{CardList.truncateHeader(card.title)}</CardHeader>
              <CardText>{card.description}</CardText>
            </TextWrapper>
          </CardWrapper>
        ))}
      </CardsContainer>
    );
  }
}
