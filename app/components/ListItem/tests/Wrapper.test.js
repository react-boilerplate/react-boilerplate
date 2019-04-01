import React from 'react';
import { render } from 'react-testing-library';

import Wrapper from '../Wrapper';

describe('<Wrapper />', () => {
  it('should render an <li> tag', () => {
    const { container } = render(<Wrapper />);
    const element = container.querySelector('li');
    expect(element).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Wrapper />);
    const element = container.querySelector('li');
    expect(element.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Wrapper id={id} />);
    const element = container.querySelector('li');
    expect(element.hasAttribute('id')).toBe(true);
    expect(element.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Wrapper attribute="test" />);
    const element = container.querySelector('li');
    expect(element.hasAttribute('attribute')).toBe(false);
  });
});
