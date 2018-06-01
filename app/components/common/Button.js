import styled from 'styled-components';

export default styled.button`
  width: 120px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 16px;
  height: ${({ height }) => height || '100%'};
  background-color: slategray;
  color: white;
  cursor: pointer;
`;
