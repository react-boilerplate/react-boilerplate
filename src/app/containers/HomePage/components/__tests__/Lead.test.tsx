import React from 'react';
import { render } from '@testing-library/react';
import { DefaultTheme } from 'styled-components';
import { themes } from 'styles/theme/themes';
import { Lead } from '../Lead';

const renderWithTheme = (theme: DefaultTheme) => render(<Lead theme={theme} />);

describe('<Lead />', () => {
  it('should render and match the snapshot', () => {
    const lead = renderWithTheme(themes.light);
    expect(lead.container.firstChild).toMatchSnapshot();
  });

  it('should use theme from props', () => {
    let lead = renderWithTheme(themes.light);
    expect(lead.container.firstChild).toHaveStyle(
      `color: ${themes.light.textSecondary}`,
    );
    lead = renderWithTheme(themes.dark);
    expect(lead.container.firstChild).toHaveStyle(
      `color: ${themes.dark.textSecondary}`,
    );
  });
});
