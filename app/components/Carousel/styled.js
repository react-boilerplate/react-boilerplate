import styled, { keyframes } from 'styled-components';

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const slideAction = (currentXPos, nextXPos) => keyframes`
  from { transform: translateX(${currentXPos}%); }
  to { transform: translateX(${nextXPos}%); }
`;

export const CarouselContainer = styled.div`
  height: 600px;
  display: flex;
  list-style: none;
  flex-direction: row;
  animation: ${({ currentXPos, nextXPos }) => `0.5s ${slideAction(currentXPos, nextXPos)} 1 normal`};
  animation-fill-mode: forwards;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 380px;
  z-index: 1;
`;

export const Arrow = styled.img`
  height: 70px;
  cursor: pointer;
  visibility: ${({ visibility }) => visibility};
`;

export const CarouselItem = FlexCenter.extend`
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
  height: 100%;
`;

export const Book = styled.img`
  width: 100%;
`;

export const QuotesContainer = FlexCenter.extend`
  width: 70%;
  height: 100%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.75);
  margin-left: 1%;
`;

export const QuoteWrapper = FlexCenter.extend`
  flex-direction: column;

`;

export const Quote = styled.blockquote`
  font-family: 'Montserrat', sans-serif;
`;

export const QuoteBy = styled.cite`
  height: 40px;
`;
