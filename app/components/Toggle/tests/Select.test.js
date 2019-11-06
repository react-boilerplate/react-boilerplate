import React from 'react';
import { render } from '@testing-library/react';

import Select from '../Select';

describe('<Select />', () => {
  it('should render an <select> tag', () => {
    const { container } = render(<Select />);
    expect(container.firstChild.tagName).toEqual('SELECT');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Select />);
    expect(container.firstChild).toHaveAttribute('class');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Select id={id} />);
    expect(container.firstChild).toHaveAttribute('id', id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Select attribute="test" />);
    expect(container.firstChild).not.toHaveAttribute('attribute');
  });
});
