import React from 'react';
import { render } from 'react-testing-library';

import Section from '../Section';

describe('<Section />', () => {
  it('should render an <section> tag', () => {
    const { container } = render(<Section />);
    expect(container.firstChild.tagName).toEqual('SECTION');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Section />);
    expect(container.firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Section id={id} />);
    expect(container.firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Section attribute="test" />);
    expect(container.firstChild.hasAttribute('attribute')).toBe(false);
  });
});
