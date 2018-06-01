import React, { PropTypes } from 'react';

import { ButtonContainer, ButtonImg } from './styled';

const IconButton = ({ onClick, src, backgroundColor, right, dimensions }) => (
  <ButtonContainer onClick={onClick} backgroundColor={backgroundColor} right={right}>
    <ButtonImg src={src} dimensions={dimensions} />
  </ButtonContainer>
);

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  right: PropTypes.string,
  dimensions: PropTypes.string,
};

export default IconButton;
