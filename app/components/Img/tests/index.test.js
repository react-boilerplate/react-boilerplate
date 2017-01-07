import Img from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

const src = 'test.png';
const alt = 'test';
const renderComponent = (props = {}) => shallow(
  <Img src={src} alt={alt} {...props} />
);

describe('<Img />', () => {
  it('should render an <img> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.is('img')).toBe(true);
  });

  it('should have an src attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('src')).toEqual(src);
  });

  it('should have an alt attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('alt')).toEqual(alt);
  });

  it('should not have a className attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.prop('className')).toNotExist();
  });

  it('should adopt a className attribute', () => {
    const className = 'test';
    const renderedComponent = renderComponent({ className });
    expect(renderedComponent.hasClass(className)).toBe(true);
  });

  it('should not adopt a srcset attribute', () => {
    const srcset = 'test-HD.png 2x';
    const renderedComponent = renderComponent({ srcset });
    expect(renderedComponent.prop('srcset')).toNotExist();
  });
});
