import React from 'react';
import { render } from '@testing-library/react';

import { FormLabel } from '../index';
import { themes } from 'styles/theme/themes';
import { DefaultTheme } from 'styled-components';

const renderWithTheme = (theme?: DefaultTheme) =>
  render(<FormLabel theme={theme || themes.light} />);

describe('<FormLabel />', () => {
  it('should render an <label> tag', () => {
    const label = renderWithTheme();
    expect(label.container.querySelector('label')).toBeInTheDocument();
  });

  it('should have theme', () => {
    const a = renderWithTheme();
    expect(a.container.firstChild).toHaveStyle(
      `color: ${themes.light.textSecondary}`,
    );
  });
});
