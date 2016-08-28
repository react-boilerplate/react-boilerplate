import Img from '../index';

import { expect } from 'chai';
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
    expect(renderedComponent).to.have.tagName('img');
  });

  it('should have an src attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent).to.have.attr('src', src);
  });

  it('should have an alt attribute', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent).to.have.attr('alt', alt);
  });

  it('should adopt a className attribute', () => {
    const className = 'test';
    const renderedComponent = renderComponent({ className });
    expect(renderedComponent).to.have.attr('class', className);
  });

  it('should not adopt a srcset attribute', () => {
    const srcset = 'test-HD.png 2x';
    const renderedComponent = renderComponent({ srcset });
    expect(renderedComponent).to.not.have.attr('srcset', srcset);
  });
});
