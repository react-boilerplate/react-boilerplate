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
import EditButton from '../common/EditButton';

export default class CardList extends Component {
  static propTypes = {
    cardsArr: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
  };

  static truncateHeader = (header) => header.length > 65 ? `${header.substring(0, 65)}...` : header;

  static truncateDescription = (description) => `${description.substring(0, 130).replace(/"/g, '')}...`;

  state = { showButtons: '' };

  handleMouseOver = (id) => this.setState({ showButtons: id });

  handleMouseLeave = () => this.setState({ showButtons: '' });

  handleDelete = (evt, id) => {
    evt.preventDefault();
    this.props.handleDelete(id);
  }

  render() {
    return (
      <CardsContainer id="cards-container">
        {this.props.cardsArr.map((card) => (
          <CardFlexContainer key={card._id} onMouseEnter={() => this.handleMouseOver(card._id)} onMouseLeave={this.handleMouseLeave}>
            <Link to={`/books/${card._id}`} key={card._id}>
              <CardWrapper src={card.imgSrc}>
                {this.state.showButtons === card._id && <DeleteButton onClick={(evt) => this.handleDelete(evt, card._id)} />}
                {this.state.showButtons === card._id && <Link to={`/books/${card._id}/edit`}>
                  <EditButton />
                </Link>}
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
