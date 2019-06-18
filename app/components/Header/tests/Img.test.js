import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Img from '../Img';

const alt = 'test';
const renderComponent = (props = {}) => {
  const utils = render(
    <Img src="http://example.com/test.jpg" alt={alt} {...props} />,
  );
  const image = utils.queryByAltText(alt);
  return { ...utils, image };
};

describe('<Img />', () => {
  it('should match the snapshot', () => {
    const { container } = renderComponent();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a class attribute', () => {
    const { image } = renderComponent();
    expect(image).toHaveAttribute('class');
  });

  it('should not adopt an invalid attribute', () => {
    const { image } = renderComponent({ attribute: 'test' });
    expect(image).not.toHaveAttribute('attribute');
  });
});
