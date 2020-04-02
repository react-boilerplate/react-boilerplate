import React from 'react';
import { render } from '@testing-library/react';

import Circle from '../Circle';

describe('<Circle />', () => {
  it('should render a <div> tag', () => {
    const { container } = render(<Circle />);
    expect((container.firstChild! as HTMLElement).tagName).toEqual('DIV');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Circle />);
    expect(container.firstChild).toHaveAttribute('class');
  });

  it('should not adopt attributes', () => {
    const id = 'test';
    const { container } = render(<Circle id={id} />);
    expect(container.firstChild).not.toHaveAttribute('id');
  });
});
