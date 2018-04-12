import styled, { keyframes } from 'styled-components';

const slideAction = (currentXPos, nextXPos) => keyframes`
  from { transform: translateX(${currentXPos}%); }
  to { transform: translateX(${nextXPos}%); }
`;

export const CarouselContainer = styled.div`
  height: ${({ carouselHeight }) => typeof carouselHeight === 'number' ? `${carouselHeight}px` : carouselHeight};
  display: flex;
  list-style: none;
  flex-direction: row;
  animation: ${({ currentXPos, nextXPos, slideTime }) => `${slideTime}s ${slideAction(currentXPos, nextXPos)} 1 normal`};
  animation-fill-mode: forwards;

  @media (max-width: 700px) {
    height: ${({ carouselHeight }) => typeof carouselHeight === 'number' ? `${carouselHeight * (2 / 3)}px` : carouselHeight};
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: ${({ arrowOffset }) => arrowOffset}px;
  z-index: 1;

  @media (max-width: 700px) {
    top: ${({ arrowOffset }) => arrowOffset * (2 / 3)}px;
  }
`;

export const Arrow = styled.img`
  height: 70px;
  cursor: pointer;
  visibility: ${({ visibility }) => visibility};
`;

export const DotsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

export const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: black;
  opacity: ${({ selected }) => selected ? 0.9 : 0.3};
  margin: 0px 8px;
  cursor: pointer;
`;
