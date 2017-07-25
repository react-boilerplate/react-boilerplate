import styled from 'styled-components';

export const AppWrapper = styled.div`
  height: 50%;
  max-height: 50%;
  width: 50%;

  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;

  align-items: stretch;
  justify-content: flex-start;

  border-radius: 0.125rem;

  ${'' /* background-color: #f7f7f7; */}
  background-color: rgba(74, 98, 117, 0.9);
  filter: drop-shadow(5px 5px 5px rgba(179, 179, 179, 0.5));
`;
