import React from 'react';
import { render } from '@testing-library/react';
import { DefaultTheme } from 'styled-components';
import { themes } from 'styles/theme/themes';
import { Title } from '../Title';

const renderWithTheme = (theme: DefaultTheme) =>
  render(<Title theme={theme} />);

describe('<Title />', () => {
  it('should render and match the snapshot', () => {
    const comp = renderWithTheme(themes.light);
    expect(comp.container.firstChild).toMatchSnapshot();
  });

  it('should use theme from props', () => {
    let comp = renderWithTheme(themes.light);
    expect(comp.container.firstChild).toHaveStyle(
      `color: ${themes.light.text}`,
    );
    comp = renderWithTheme(themes.dark);
    expect(comp.container.firstChild).toHaveStyle(`color: ${themes.dark.text}`);
  });
});
