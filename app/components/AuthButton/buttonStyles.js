import styled from 'styled-components';

/** ----  Vault Vision added code file ---- */
/**
 * Button Styled component for authButton
 */
export const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  color: #41addd;
  margin: 1rem 0;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;
