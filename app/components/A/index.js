/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';
import { color } from 'styles';

const A = styled.a`
  color: ${color.primary};

  &:hover {
    color: ${color.primary_light};
  }
`;

export default A;
