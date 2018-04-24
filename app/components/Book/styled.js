import styled from 'styled-components';

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20%;
  height: 317px;
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
`;

export const BookWrapper = styled.div`
  width: 25%;
  max-height: 100%;
`;

export const BookImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const HeaderTextWrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const HeaderText = styled.h3`
  margin: 0;
  font-family: 'Montserrat';
  font-size: 1.5em;
`;

export const HeaderSubText = HeaderText.extend`
  font-size: 1em;
  font-style: italic;
`;

export const Description = styled.p`
  margin: 0;
`;
