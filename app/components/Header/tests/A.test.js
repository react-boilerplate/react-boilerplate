import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import A from '../A';

const renderComponent = (props = {}) => {
  const utils = render(<A {...props}>Link</A>);
  const link = utils.queryByText('Link');
  return { ...utils, link };
};

describe('<A />', () => {
  it('should match the snapshot', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const { link } = renderComponent();
    expect(link).toHaveAttribute('class');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { link } = renderComponent({ id });
    expect(link).toHaveAttribute('id', id);
  });

  it('should not adopt an invalid attribute', () => {
    const { link } = renderComponent({ attribute: 'test' });
    expect(link).not.toHaveAttribute('attribute');
  });
});
