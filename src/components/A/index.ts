import styled from 'styled-components/macro';

const A = styled.a`
  color: ${p => p.theme.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    opacity: 0.4;
  }
`;

export default A;
