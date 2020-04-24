import React from 'react';
import { render } from '@testing-library/react';

import { TextButton } from '../TextButton';
import { themes } from 'styles/theme/themes';
import { DefaultTheme } from 'styled-components';

const renderWithTheme = (theme?: DefaultTheme) =>
  render(<TextButton theme={theme || themes.light} />);

describe('<TextButton />', () => {
  it('should render an <button> tag', () => {
    const button = renderWithTheme();
    expect(button.container.querySelector('button')).toBeInTheDocument();
  });

  it('should have theme', () => {
    const button = renderWithTheme();
    expect(button.container.firstChild).toHaveStyle(
      `color: ${themes.light.primary}`,
    );
  });
});
