import styled from 'styled-components'

const color = 'red'

// ⚠️ BAD INDENTATION ⚠️
const Button2 = styled.button.attrs({
  type: 'normal'
})`
  display: block;
  ${
    props => props.isHovering && interpolatedStyle
  }
  position: ${
    props => props.position
  };
color: ${color};
  background: blue;
`
