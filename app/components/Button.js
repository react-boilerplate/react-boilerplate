import styled from 'styled-components';

export default styled.button`
  background-color: ${props => (props.menu ? '#4caf50' : '#008CBA')};
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin-top: 5px;
`;
