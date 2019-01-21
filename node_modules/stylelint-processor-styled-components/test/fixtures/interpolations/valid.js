import styled from 'styled-components'

const color = 'red'

// Normal styled component
const Button = styled.button`
  display: block;
  color: ${color};
  background: blue;
`

const Box = styled.div`
  display: block;
  color: ${color};
  background: blue;
`

// Tagname notation
const Button2 = styled('button')`
  display: block;
  color: ${color};
  background: blue;
`

const Box2 = styled('div')`
  display: block;
  color: ${color};
  background: blue;
`

// Component Notation
const Button3 = styled(Button2)`
  display: block;
  color: ${color};
  background: blue;
`

const Box3 = styled(Box2)`
  display: block;
  color: ${color};
  background: blue;
`

// Multiline
const Button4 = styled.button`
  display: block;
  ${`
    color: blue;
  `}
  background: blue;
`

// Conditional
const cond = true
const Button5 = styled.button`
  display: block;
  ${cond &&
    `
    color: blue;
  `}
  background: blue;
`

// Conditional
const cond2 = false
const Button6 = styled.button`
  display: block;
  ${cond2 &&
   `
    color: ${cond2};
  `}
  background: blue;
`

// multi interpolations within a property
const borderWidth = '1px'
const borderStyle = 'solid'
const Button7 = styled.button`
  width: 20px;
  border: ${borderWidth} ${borderStyle} ${color};
`

// Several interpolation statements in a block
const Button8 = styled.button`
  ${`display: block;`}
  ${`color: ${color};`}
  ${`background: blue;`}
`
// Simple interpolations in one-line css
const display = 'block'
const colorExpression = 'color: red;'
const Button9 = styled.button`
  display: ${display}; ${colorExpression}
`

// Complex interpolations in one-line css
const backgroundExpression = 'background: blue;'
const Button9 = styled.button`
  display: ${display}; ${colorExpression} ${backgroundExpression}
`
// Interpolations in nested blocks
const Button10 = styled.button`
  span {
    ${'display: block;'}
  }
`;

// Interpolations after comments
const Button11 = styled.button`
  display: block; /* stylelint-disable-line */
  ${colorExpression}
`

const Button12 = styled.button`
  display: block;
  /* stylelint-disable */
  ${colorExpression}
`

const Button13 = styled.button`
  display: block;
  /*
    multiline comment with "*" and "/"
  */
  ${colorExpression}
`

const Button14 = styled.button`
  display: block;
  /**
   * JSDoc style comment
   */
  ${colorExpression}
`
