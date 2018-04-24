import styled from 'styled-components';

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  height: 317px;
  width: 100%;
  padding: 20px 20%;

  @media (max-width: 835px) {
    flex-direction: column;
  }
`;

export const BookWrapper = styled.div`
  width: 40%;
  max-height: 100%;
`;

export const BookImage = styled.img`
  width: 214px;
  height: 277px;
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

export const DescriptionContainer = styled.div`
  padding: 10px 10%;
`;

export const Description = styled.p`
  margin: 0;
  font-family: 'Montserrat';
`;

export const PraiseContainer = styled.div`
  padding: 10px 15%;
  display: flex;
  flex-direction: column;
`;

export const PraiseHeader = HeaderText.extend`
  align-self: center;
`;

export const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const Quote = styled.blockquote`
  font-family: 'Montserrat', sans-serif;
`;

export const QuoteBy = styled.cite`
  align-self: center;
`;

export const Hyperlink = styled.h6`
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
  align-self: center;
  font-family: 'Montserrat';
  font-size: 1em;
`;
