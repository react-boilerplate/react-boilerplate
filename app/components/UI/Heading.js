import styled from 'styled-components';

export default styled.h5`
  background-color: ${props =>
    props.background ? props.background : '#008CBA'};
  color: ${props => (props.color ? props.color : '#fff')};
  padding: 6px 8px;
  text-align: center;
  margin: 5px;
  width: max-content;

  &:hover {
    background-color: #4caf50;
  }
`;
