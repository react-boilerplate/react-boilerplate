import styled, { css } from 'styled-components'

const interpolatedStyle = css`
  background-color: gray;
  color: gray;
`

// Interpolation of chunk
const Div = styled.div`
  ${interpolatedStyle}
`

// Conditional interpolation of chunk
const Button = styled.button`
  ${props => props.isHovering && interpolatedStyle}
`
