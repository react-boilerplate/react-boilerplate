import styled from 'styled-components';

export const ButtonContainer = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${({ backgroundColor }) => backgroundColor};
  box-shadow: 1px 1px 10px 1px #ffffffa1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-self: flex-end;
  position: absolute;
  top: 5px;
  right: ${({ right }) => right || '5px'};
  cursor: pointer;
`;

export const ButtonImg = styled.img`
  height: ${({ dimensions }) => dimensions || '100%'};
  width: ${({ dimensions }) => dimensions || '100%'};
`;
