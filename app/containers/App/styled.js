import styled from 'styled-components';

export const AppContainer = styled.div`
  opacity: ${({ modalOpen }) => modalOpen ? '0.5' : '1'};
`;

export const ModalText = styled.p`
  margin: 0;
  font-family: 'Montserrat';
`;
