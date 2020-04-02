import * as React from 'react';
import styled, { keyframes } from 'styles/styled-components';

const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
`;

interface Props {
  rotate?: number;
  delay?: number;
  id?: string;
}
const Circle = (props: Props) => {
  const CirclePrimitive = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    ${props.rotate &&
    `
      -webkit-transform: rotate(${props.rotate}deg);
      -ms-transform: rotate(${props.rotate}deg);
      transform: rotate(${props.rotate}deg);
    `} &:before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: #999;
      border-radius: 100%;
      animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
      ${props.delay &&
      `
        -webkit-animation-delay: ${props.delay}s;
        animation-delay: ${props.delay}s;
      `};
    }
  `;
  return <CirclePrimitive />;
};

export default Circle;
