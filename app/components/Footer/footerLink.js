/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

const FooterLink = styled.a`

  font-size: 13px;
  margin: 0;
  padding: 0;
  line-height: 28px;
  color: #919497;

  &:hover {
    color: #337ab7;
    text-decoration: underline;S  
  }
`;

export default FooterLink;
