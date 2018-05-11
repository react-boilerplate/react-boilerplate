import styled from 'styled-components';

export const FooterContainer = styled.div`
  align-self: flex-end;
  background: tomato;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 50px;
  align-content: space-between;
  margin-top: 50px;
`;

export const FooterText = styled.h6`
  margin: 0;
  color: black;
  font-family: 'Montserrat';
  height: auto;
`;

export const Copyright = FooterText.extend`

`;
