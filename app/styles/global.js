import { injectGlobal } from 'styled-components';
import { color, font } from 'styles';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: ${font.sans_preload};
  }

  body.fontLoaded {
    font-family: ${font.sans};
  }

  #app {
    background-color: ${color.white};
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: ${font.serif};
    line-height: 1.5em;
  }
`;
