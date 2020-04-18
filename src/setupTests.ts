// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import 'jest-styled-components';
