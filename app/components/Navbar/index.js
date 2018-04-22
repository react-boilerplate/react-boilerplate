import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Navbar, Header, ButtonContainer, Button, ButtonText } from './styled';
import { Link } from '../common';
import messages from './messages';

export default () => (
  <Navbar>
    <Link to="/">
      <Header>RICHARD BERNSTEIN</Header>
    </Link>
    <ButtonContainer>
      <Link to="/about">
        <Button>
          <ButtonText><FormattedMessage {...messages.about} /></ButtonText>
        </Button>
      </Link>
      <Link to="/books">
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
