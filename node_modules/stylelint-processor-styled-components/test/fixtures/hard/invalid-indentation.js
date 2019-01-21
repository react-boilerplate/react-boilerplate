import styled from 'styled-components'

// ⚠ 2 indentation errors ⚠
const Comp = () => {
  const Button = styled.button`
    color: blue;
      background: red;
  display: block;
  `

  return Button
}

// ⚠ 2 indentation errors ⚠
const Comp2 = () => {
  const InnerComp = () => {
    const Button = styled.button`
      color: blue;
        background: red;
    display: block;
    `

    return Button
  }

  return InnerComp()
}

// The below don't follow our specifications of keeping closing backtick on base indentation level
// ⚠ 3 indentation errors ⚠
const Comp3 = () => {
  const InnerComp = () => {
    const Button = styled.button`
      color: blue;
      background: red;
      display: block;
`

    return Button
  }

  return InnerComp()
}

// ⚠ 3 indentation errors ⚠
const Comp4 = () => {
  const InnerComp = () => {
    const Button = styled.button`
      color: blue;
      background: red;
      display: block;`

    return Button
  }

  return InnerComp()
}

// ⚠ 3 indentation errors ⚠
const Comp5 = () => {
  const InnerComp = () => {
    const Button = styled.button`
      color: blue;
      background: red;
      display: block;
  `

    return Button
  }

  return InnerComp()
}
