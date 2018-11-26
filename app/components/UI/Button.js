import styled from 'styled-components';

export default styled.button`
  background-color: ${props => (props.menu ? '#4caf50' : '#008CBA')};
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  font-size: 14px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;
