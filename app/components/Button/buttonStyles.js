import { css } from 'styled-components';

const buttonStyles = css`
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
  background-color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: #41addd;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(65, 173, 221, 0.6);
  }

  &:active {
    background: #1e90ff;
    color: white;
    transform: scale(0.98);
  }
`;

export default buttonStyles;
