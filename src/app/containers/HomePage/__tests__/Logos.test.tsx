import React from 'react';
import { Logos } from '../Logos';
import { render } from '@testing-library/react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { themes } from 'styles/theme/themes';

const renderLogos = (theme: DefaultTheme) =>
  render(
    <ThemeProvider theme={theme}>
      <Logos />
    </ThemeProvider>,
  );
describe('<Logos />', () => {
  it('should render and match the snapshot', () => {
    const logos = renderLogos(themes.light);
    expect(logos.asFragment()).toMatchSnapshot();
  });

  it('should use theme from props', () => {
    let logos = renderLogos(themes.light);
    expect(logos.container.firstChild).toHaveStyle(
      `color: ${themes.light.border}`,
    );
    logos = renderLogos(themes.dark);
    expect(logos.container.firstChild).toHaveStyle(
      `color: ${themes.dark.border}`,
    );
  });
});
