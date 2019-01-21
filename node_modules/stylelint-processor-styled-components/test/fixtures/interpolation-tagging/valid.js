import styled from 'styled-components';

// Test block
const Button1 = styled.button`
  color: red;
  ${/* sc-block */ 'dummy'}
`;

// Test selector
const Button2 = styled.button`
  color: red;
  ${/* sc-selector */ ':hover'} {
    background-color: blue;
  }
  ${/* sc-selector */ ':active'} {
    background-color: green;
  }
`;

// Test declaration
const Button3 = styled.button`
  color: red;
  ${/* sc-declaration */ 'dummy'}
  ${/* sc-declaration */ 'dummy2'}
`;

// Test property
const Button4 = styled.button`
  color: red;
  ${/* sc-property */ 'background-color'}: blue;
`;

// Test value
const Button5 = styled.button`
  color: red;
  background-color: ${/* sc-value */ 'blue'};
`;

// Test custom
const bool = true;
const Button6 = styled.button`
  color: red;
  margin-${/* sc-custom 'left' */ bool ? 'left' : 'right'}: 10px;
`;
