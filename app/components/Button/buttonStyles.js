import { css } from 'styled-components';
import { color, size, font } from 'styles';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: ${size.border_radius};
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: ${font.sans};
  font-weight: bold;
  font-size: 16px;
  border: 2px solid ${color.primary};
  color: ${color.primary};

  &:active {
    background: ${color.primary};
    color: #fff;
  }
`;

export default buttonStyles;
