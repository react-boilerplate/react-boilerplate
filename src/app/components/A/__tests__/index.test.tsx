import React from 'react';
import { render } from '@testing-library/react';

import { A } from '../index';
import { themes } from 'styles/theme/themes';
import { DefaultTheme } from 'styled-components';

const renderWithTheme = (theme?: DefaultTheme) =>
  render(<A theme={theme || themes.light} />);

describe('<A />', () => {
  it('should render an <a> tag', () => {
    const a = renderWithTheme();
    expect(a.container.querySelector('a')).toBeInTheDocument();
  });

  it('should have theme', () => {
    const a = renderWithTheme();
    expect(a.container.firstChild).toHaveStyle(
      `color: ${themes.light.primary}`,
    );
  });
});
