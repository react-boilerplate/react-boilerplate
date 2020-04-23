import React from 'react';
import { render } from '@testing-library/react';

import { Link } from '../index';
import { themes } from 'styles/theme/themes';
import { DefaultTheme } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

const renderWithTheme = (theme?: DefaultTheme) => {
  return render(
    <MemoryRouter>
      <Link to="/test" theme={theme || themes.light}>
        HeaderLink
      </Link>
    </MemoryRouter>,
  );
};

describe('<Link />', () => {
  it('should match snapshot', () => {
    const link = renderWithTheme();
    expect(link.container.firstChild).toMatchSnapshot();
  });

  it('should have theme', () => {
    const link = renderWithTheme();
    expect(link.container.firstChild).toHaveStyle(
      `color: ${themes.light.primary}`,
    );
  });

  it('should have a class attribute', () => {
    const link = renderWithTheme();
    expect(link.queryByText('HeaderLink')).toHaveAttribute('class');
  });
});
