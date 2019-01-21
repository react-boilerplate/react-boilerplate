import styled from 'styled-components'

// ⚠️ BAD INDENTATION at 5:1 ⚠️
const Button = styled.button`
color: blue;
`

// Correct example
const Button2 = styled.button`
  color: blue;
`

// ⚠️ BAD INDENTATION at 10:5 ⚠️
const Button3 = styled.button`
    color: blue;
`

// ⚠️ BAD INDENTATION at 22:5 ⚠️
const Button4 = styled.button`
  color: blue;
  background: ${color};
    display: block; 
`

// ⚠️ BAD INDENTATION at 28:5 ⚠️
const Button5 = styled.button`
  color: blue;
    background: ${color};
  display: block; 
`

// ⚠️ BAD INDENTATION at 35:5 ⚠️
const Button6 = styled.button`
  color: blue;
    ${`
      background: red;
    `}
  display: block; 
`
