import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as CRALogo } from './cra-logo.svg';
import { ReactComponent as RPLogo } from './rp-logo.svg';
import { ReactComponent as PlusSign } from './plus-sign.svg';

export default function Logos() {
  return (
    <Wrapper>
      <CRALogo className="logo" />
      <PlusSign className="sign" />
      <RPLogo className="logo" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .logo {
    width: 4.5rem;
    height: 4.5rem;
  }

  .sign {
    width: 2rem;
    height: 2rem;
    margin: 0 2rem;
  }
`;
