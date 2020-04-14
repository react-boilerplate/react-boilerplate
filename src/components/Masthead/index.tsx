import React from 'react';
import styled from 'styled-components/macro';
import Container from 'components/Container';
import Logos from './Logos';
import Title from 'components/Title';
import Lead from 'components/Lead';
import A from 'components/A';

export default function Masthead() {
  return (
    <Wrapper>
      <Container>
        <Logos />
        <Title>React Boilerplate meets CRA</Title>
        <Lead>
          Now you can use the{' '}
          <A
            href="https://www.reactboilerplate.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Boilerplate
          </A>{' '}
          as{' '}
          <A
            href="https://create-react-app.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Create React App
          </A>{' '}
          template.
        </Lead>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 320px;

  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
