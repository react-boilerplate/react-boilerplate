import React, { Component, PropTypes } from 'react';

import {
  CardsContainer,
  CardWrapper,
  TextWrapper,
  CardHeader,
  CardText,
  CardFlexContainer,
} from './styled';
import { Link } from '../common';
import DeleteButton from '../common/DeleteButton';

export default class CardList extends Component {
  static propTypes = {
    cardsArr: PropTypes.array.isRequired,
  };

  static truncateHeader = (header) => header.length > 65 ? `${header.substring(0, 65)}...` : header;

  static truncateDescription = (description) => `${description.substring(0, 130).replace(/"/g, '')}...`;

  state = { showDelete: '' };

  handleMouseOver = (isbn) => this.setState({ showDelete: isbn });

  handleMouseLeave = () => this.setState({ showDelete: '' });

  handleDelete = (evt) => {
    evt.preventDefault();
    console.log('Delete!');
  }

  render() {
    return (
      <CardsContainer id="cards-container">
        {this.props.cardsArr.map((card) => (
          <CardFlexContainer key={card.isbn} onMouseEnter={() => this.handleMouseOver(card.isbn)} onMouseLeave={this.handleMouseLeave}>
            <Link to={`/books/${card.isbn}`} key={card.isbn}>
              <CardWrapper src={card.imgSrc}>
                {this.state.showDelete === card.isbn && <DeleteButton onDelete={this.handleDelete} />}
                <TextWrapper>
                  <CardHeader>{CardList.truncateHeader(card.title)}</CardHeader>
                  <CardText>{CardList.truncateDescription(card.description)}</CardText>
                </TextWrapper>
              </CardWrapper>
            </Link>
          </CardFlexContainer>
        ))}
      </CardsContainer>
    );
  }
}
