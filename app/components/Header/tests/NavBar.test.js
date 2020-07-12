import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import NavBar from '../NavBar';

const renderComponent = (props = {}) => {
  const { container } = render(<NavBar {...props} />);
  return container;
};

describe('<NavBar />', () => {
  it('should match the snapshot', () => {
    const container = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const container = renderComponent();
    expect(container.firstChild).toHaveAttribute('class');
  });

  it('should not adopt an invalid attribute', () => {
    const container = renderComponent({ attribute: 'test' });
    expect(container.firstChild).not.toHaveAttribute('attribute');
  });
});
