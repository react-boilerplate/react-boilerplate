import styled from 'styled-components';
import { color } from 'styles';

const Wrapper = styled.li`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  position: relative;
  border-top: 1px solid ${color.off_white};

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;
