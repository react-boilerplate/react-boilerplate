import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: 'Heavitas';
    src: url('./type/Heavitas.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0px 0px 0px 0px;
    margin: 0px 0px 0px 0px;
  }

  body {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
    font-style: italic;
  }

  body.fontLoaded {
    font-family: 'Libre Baskerville', serif;
    font-weight: 400;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .p-menubar-custom {
    float: left !important;
    padding: 0em !important;
  }

  .p-menuitem-text {
    justify-content: center;
    align-content: center;
    align-items: center;
  }
`;
