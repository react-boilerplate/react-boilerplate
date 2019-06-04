import React from 'react';
import { render } from '@testing-library/react';

import Img from '../index';

const src = 'test.png';
const alt = 'test';
const renderComponent = (props = {}) => {
  const utils = render(<Img src={src} alt={alt} {...props} />);
  const image = utils.queryByAltText(alt);
  return { ...utils, image };
};

describe('<Img />', () => {
  it('should render an <img> tag', () => {
    const { image } = renderComponent();
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });

  it('should throw when no alt attribute is specified', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      /* noop */
    });
    render(<Img src={src} />);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });

  it('should have a src attribute', () => {
    const { image } = renderComponent();
    expect(image).toHaveAttribute('src', src);
  });

  it('should not have a class attribute', () => {
    const { image } = renderComponent();
    expect(image).not.toHaveAttribute('class');
  });

  it('should adopt a className attribute', () => {
    const className = 'test';
    const { image } = renderComponent({ className });
    expect(image).toHaveClass(className);
  });

  it('should not adopt a srcset attribute', () => {
    const srcset = 'test-HD.png 2x';
    const { image } = renderComponent({ srcset });
    expect(image).not.toHaveAttribute('srcset');
  });
});
