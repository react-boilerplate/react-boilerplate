import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as CRALogo } from './assets/cra-logo.svg';
import { ReactComponent as RPLogo } from './assets/rp-logo.svg';
import { ReactComponent as PlusSign } from './assets/plus-sign.svg';

export function Logos() {
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
  color: ${p => p.theme.border};

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
