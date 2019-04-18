import React from 'react';
import { render } from 'react-testing-library';

import Ul from '../Ul';

describe('<Ul />', () => {
  it('should render an <ul> tag', () => {
    const { container } = render(<Ul />);
    const element = container.firstElementChild;
    expect(element.tagName).toEqual('UL');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Ul />);
    const element = container.firstElementChild;
    expect(element.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Ul id={id} />);
    const element = container.firstElementChild;
    expect(element.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Ul attribute="test" />);
    const element = container.firstElementChild;
    expect(element.hasAttribute('attribute')).toBe(false);
  });
});
