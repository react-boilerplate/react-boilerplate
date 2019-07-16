import React from 'react';
import { render } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import A from '../A';

describe('<A />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<A />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const { container } = render(<A />);
    expect(container.querySelector('a').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<A id={id} />);
    expect(container.querySelector('a').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<A attribute="test" />);
    expect(container.querySelector('a').getAttribute('attribute')).toBeNull();
  });
});
