import React, { PropTypes } from 'react';

import { ButtonContainer, ButtonText } from './styled';

const DeleteButton = ({ onDelete }) => (
  <ButtonContainer onClick={onDelete}>
    <ButtonText>X</ButtonText>
  </ButtonContainer>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
