import React from 'react';
import { render } from '@testing-library/react';

import { LoadingIndicator } from '../index';
import { themes } from 'styles/theme/themes';
import { DefaultTheme, ThemeProvider } from 'styled-components';

const renderWithTheme = (
  props: Parameters<typeof LoadingIndicator>[number] = {},
  theme?: DefaultTheme,
) =>
  render(
    <ThemeProvider theme={theme || themes.light}>
      <LoadingIndicator {...props} />
    </ThemeProvider>,
  );

describe('<LoadingIndicator />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = renderWithTheme();
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot when props changed', () => {
    const loadingIndicator = renderWithTheme({ small: true });
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should have theme', () => {
    const loadingIndicator = renderWithTheme();
    expect(loadingIndicator.container.querySelector('circle')).toHaveStyle(
      `stroke: ${themes.light.primary}`,
    );
  });
});
