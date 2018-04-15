import styled, { keyframes } from 'styled-components';

const getNextPosition = (currentIndex, prevIndex, nextIndex) => {
  if (currentIndex !== prevIndex) return '0%';
  else if (currentIndex !== nextIndex) return '-200%';
  return '-100%';
};

const slideAction = (currentIndex, prevIndex, nextIndex) => keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(${getNextPosition(currentIndex, prevIndex, nextIndex)}); }
`;

export const CarouselItemContainer = styled.div`
  position: relative;
  left: ${({ left }) => left};
  flex: 1 0 100%;
`;

export const CarouselContainer = styled.div`
  height: ${({ carouselHeight }) => typeof carouselHeight === 'number' ? `${carouselHeight}px` : carouselHeight};
  display: flex;
  list-style: none;
  flex-direction: row;
  animation: ${({ currentIndex, prevIndex, nextIndex, slideTime }) => `${slideTime}s ${slideAction(currentIndex, prevIndex, nextIndex)} 1 normal`};
  animation-fill-mode: forwards;
  transform: translateX(-100%);
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: ${({ arrowOffset }) => arrowOffset}px;
  z-index: 1;
`;

export const Arrow = styled.img`
  height: 70px;
  cursor: pointer;
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
  background: ${({ selected }) => selected ? 'black' : 'grey'};
  margin: 0px 5px;
  cursor: pointer;
`;
