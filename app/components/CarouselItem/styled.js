import styled from 'styled-components';

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarouselItemContainer = FlexCenter.extend`
  width: 100%;
  height: 100%;
  background: ${({ background }) => `url(${background})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 5% 15%;
  flex-direction: row;
  flex: 1 0 100%;
`;

export const BookContainer = FlexCenter.extend`
  width: 30%;
  height: 90%;

  @media (max-width: 700px) {
    width: 50%;
  }
`;

export const Book = styled.img`
  width: 100%;
`;

export const QuotesContainer = FlexCenter.extend`
  width: 70%;
  height: auto;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.75);
  margin-left: 1%;

  @media (max-width: 700px) {
    width: 50%;
  }
`;

export const QuoteWrapper = FlexCenter.extend`
  flex-direction: column;

`;

export const Quote = styled.blockquote`
  font-family: 'Montserrat', sans-serif;

  @media (max-width: 700px) {
    font-size: 0.8em;
    margin: 15px;
  }
`;

export const QuoteBy = styled.cite`
  height: 40px;

  @media (max-width: 700px) {
    font-size: 0.6em;
  }
`;
