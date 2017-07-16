import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: flex-start;

    background-color: #fafafa;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    display: flex;
    flex-direction: column;
    flex: 1;

    min-height: 100%;
    min-width: 100%;

    & > div {
      display: flex;
      flex-direction: column;
      flex: 1;

      align-items: center;
      justify-content: center;
    }
  }
`;
