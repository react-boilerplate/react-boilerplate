import styled from 'styled-components';

/* eslint-disable */
export const ProgressBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  visibility: ${(props) => props.hidden ? 'hidden' : 'visible'};
  opacity: ${(props) => props.hidden ? '0' : '1'};
  transition: all 500ms ease-in-out;
  z-index: ${(props) => props.hidden ? '-10' : '9999'};
`;
/* eslint-enable */

export const ProgressBarPercent = styled.div`
  height: 2px;
  background: #29D;
  transition: all 300ms ease;
`;
