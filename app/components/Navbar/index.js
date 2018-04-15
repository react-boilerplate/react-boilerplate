import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Navbar, Header, ButtonContainer, Button, ButtonText } from './styled';
import messages from './messages';

export default () => (
  <Navbar>
    <Header>RICHARD BERNSTEIN</Header>
    <ButtonContainer>
      <Link to="/about">
        <Button>
          <ButtonText><FormattedMessage {...messages.about} /></ButtonText>
        </Button>
      </Link>
      <Link to="/">
        <Button>
          <ButtonText><FormattedMessage {...messages.books} /></ButtonText>
        </Button>
      </Link>
      <Link to="/">
        <Button>
          <ButtonText><FormattedMessage {...messages.articles} /></ButtonText>
        </Button>
      </Link>
    </ButtonContainer>
  </Navbar>
);
