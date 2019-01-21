import notStyled, {
  css as notCss,
  keyframes as notKeyframes,
  injectGlobal as notInjectGlobal
} from 'styled-components'

// ⚠️ BAD INDENTATION ⚠️
const Button2 = notStyled.button`
color: blue;
`

const styles = notCss`
color: blue;
`

const animation = notKeyframes`
0% {
	opacity: 0;
}

100% {
	opacity: 1;
}
`

notInjectGlobal`
html {
	color: blue;
}
`
