import styled from 'styled-components';

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarouselContainer = FlexCenter.extend`
  width: 100%;
  height: 600px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: absolute;
`;

export const Arrow = styled.img`
  height: 100px;
  cursor: pointer;
`;

export const CarouselItem = FlexCenter.extend`
  width: 100%;
  height: 100%;
  background: ${({ background }) => background || 'tomato'};
  padding: 5% 15%;
  flex-direction: row;
`;

export const BookContainer = styled.div`
  width: 25%;
  height: 100%;
  background: blue;
`;

export const QuoteContainer = styled.div`
  width: 45%;
  height: 100%;
  background: green;
`;
