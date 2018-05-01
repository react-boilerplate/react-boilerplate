import styled from 'styled-components';
import { Link as UnstyledLink } from 'react-router-dom';

export const Link = styled(UnstyledLink)`
  color: black;
  text-decoration: none;
`;

export const Hyperlink = styled.h6`
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
  align-self: center;
  font-family: 'Montserrat';
  font-size: ${({ fontSize }) => fontSize || '1em'};
`;

export const Anchor = styled.a`
  text-decoration: none;
`;

