/**
 * Testing our link component
 */

import React from 'react';
import { render, cleanup } from 'react-testing-library';

import A from '../index';

const href = 'http://mxstbr.com/';
const children = <h1>Test</h1>;
const renderComponent = (props = {}) => (
  <A href={href} {...props}>
    {children}
  </A>
);

describe('<A />', () => {
  afterEach(cleanup);

  it('should render an <a> tag', () => {
    const { container } = render(renderComponent());
    expect(container.querySelector('a')).not.toBeNull();
  });

  it('should have an href attribute', () => {
    const { container } = render(renderComponent());
    expect(container.querySelector('a').href).toEqual(href);
  });

  it('should have children', () => {
    const { container } = render(renderComponent());
    expect(container.querySelector('a').children).toHaveLength(1);
  });

  it('should have a class attribute', () => {
    const className = 'test';
    const { container } = render(renderComponent({ className }));
    expect(container.querySelector('a').classList).toContain(className);
  });

  it('should adopt a target attribute', () => {
    const target = '_blank';
    const { container } = render(renderComponent({ target }));
    expect(container.querySelector('a').target).toEqual(target);
  });

  it('should adopt a type attribute', () => {
    const type = 'text/html';
    const { container } = render(renderComponent({ type }));
    expect(container.querySelector('a').type).toEqual(type);
  });
});
