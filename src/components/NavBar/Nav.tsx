import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { ReactComponent as DocumentationIcon } from './documentation-icon.svg';
import { ReactComponent as GithubIcon } from './github-icon.svg';

export default function Nav() {
  return (
    <Wrapper>
      <Item as={Link} to="/" title="Documentation Page">
        <DocumentationIcon />
        Documentation
      </Item>
      <Item
        href="https://github.com/Can-Sahin/cra-template-react-boilerplate"
        target="_blank"
        title="Github Page"
        rel="external"
      >
        <GithubIcon />
        Github
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
  }
`;
