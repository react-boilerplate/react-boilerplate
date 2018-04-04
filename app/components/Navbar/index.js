import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Navbar, Header, ButtonContainer, Button, ButtonText } from './styled';
import messages from './messages';

export default () => (
  <Navbar>
    <Header>RICHARD BERNSTEIN</Header>
    <ButtonContainer>
      <Button>
        <ButtonText><FormattedMessage {...messages.about} /></ButtonText>
      </Button>
      <Button>
        <ButtonText><FormattedMessage {...messages.books} /></ButtonText>
      </Button>
      <Button>
        <ButtonText><FormattedMessage {...messages.articles} /></ButtonText>
      </Button>
    </ButtonContainer>
  </Navbar>
);
