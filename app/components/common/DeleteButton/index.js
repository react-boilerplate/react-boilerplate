import React, { PropTypes } from 'react';

import { ButtonContainer, ButtonImg } from './styled';
import X from '../../../images/ic_highlight_off_white_24px.svg';

const DeleteButton = ({ onDelete }) => (
  <ButtonContainer onClick={onDelete}>
    <ButtonImg src={X} />
  </ButtonContainer>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
