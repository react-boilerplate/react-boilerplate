import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
  border: 2px solid #63d471;
  color: #41addd;
  background: #fff;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;

export default Button;
