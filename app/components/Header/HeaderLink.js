import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color, font, size } from 'styles';

export default styled(Link)`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
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
