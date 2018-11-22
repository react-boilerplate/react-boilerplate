import styled from 'styled-components';

const StyledLabel = styled.label`
  display: inline-block;
  text-align: left;
  width: 100%
  margin: 0.5em;
  color: ${props => (props.color ? props.color : '#000')};
`;

export default StyledLabel;
