import styled, { css, keyframes, injectGlobal } from 'styled-components'

/**
 * Valid
 */
const styles = css`
  color: blue;
`

const animation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Button = styled.button`
  ${styles}
  animation: 3s ${animation};
`

injectGlobal`
  html {
    margin: 0;
    padding: 0;
  }
`

// ⚠ Indentation
const styles2 = css`
color: blue;
`

// ⚠ Indentation
const animation2 = keyframes`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`

// ⚠ Indentation
injectGlobal`
html {
	margin: 0;
	padding: 0;
}
`
