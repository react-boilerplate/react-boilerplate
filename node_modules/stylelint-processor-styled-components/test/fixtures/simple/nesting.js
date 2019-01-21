import styled from 'styled-components'

// Nesting
const Button = styled.button`
  > h1 {
    color: blue;
  }
`

// Selectors
const Button2 = styled.button`
  color: red;

  &:hover {
    color: blue;
  }
`

// Complex selectors
const Button3 = styled.button`
  color: red;

  &:placeholder {
    color: blue;
  }

  &::-webkit-input-placeholder {
    color: blue;
  }
`

const color = 'red'

// Selectors + interpolations
const Button4 = styled.button`
  color: ${color};
  background: ${color};

  &:hover {
    background-color: ${color};
  }
`
