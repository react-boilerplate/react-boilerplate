import React from 'react';
import styled from 'styled-components/macro';
import Container from 'components/Container';
import Logo from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import Nav from './Nav';

export default function NavBar() {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <Nav />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.background};

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.8)',
      )};
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
