import React from 'react';
import { render } from '@testing-library/react';
import { DefaultTheme } from 'styled-components';
import { themes } from 'styles/theme/themes';
import { P } from '../P';

const renderWithTheme = (theme: DefaultTheme) => render(<P theme={theme} />);

describe('<P />', () => {
  it('should render and match the snapshot', () => {
    const p = renderWithTheme(themes.light);
    expect(p.container.firstChild).toMatchSnapshot();
  });

  it('should use theme from props', () => {
    let p = renderWithTheme(themes.light);
    expect(p.container.firstChild).toHaveStyle(
      `color: ${themes.light.textSecondary}`,
    );
    p = renderWithTheme(themes.dark);
    expect(p.container.firstChild).toHaveStyle(
      `color: ${themes.dark.textSecondary}`,
    );
  });
});
