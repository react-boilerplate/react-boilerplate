import React, { PropTypes } from 'react';

import { ButtonContainer, ButtonText } from './styled';
import { Anchor } from '../';

const VisitButton = ({ href }) => (
  <Anchor href={href} target="_blank">
    <ButtonContainer>
      <ButtonText>Visit Publisher</ButtonText>
    </ButtonContainer>
  </Anchor>
);

VisitButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default VisitButton;
