import styled from 'styled-components';

const ColorBox = styled.div`
  flex: 1;
  height: 100%;
  background: ${(props) => props.value};
`;

export default ColorBox;
