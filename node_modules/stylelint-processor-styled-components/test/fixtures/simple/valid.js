import styled from 'styled-components'

// Normal styled component
const Button = styled.button`
  color: blue;
`

const Box = styled.div`
  color: blue;
`

// Tagname notation
const Button2 = styled('button')`
  color: red;
`

const Box2 = styled('div')`
  color: red;
`

// Component Notation
const Button3 = styled(Button2)`
  color: violet;
`

const Box3 = styled(Box2)`
  color: violet;
`
