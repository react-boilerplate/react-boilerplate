import React from 'react';
import { render } from '@testing-library/react';

import H3 from '../index';

const children = 'Text';
const renderComponent = (props = {}) => {
  const utils = render(<H3 {...props}>{children}</H3>);
  const heading = utils.queryByText(children);
  return { ...utils, heading };
};

describe('<H3 />', () => {
  it('should render a prop', () => {
    const id = 'test';
    const { heading } = renderComponent({ id });
    expect(heading).toHaveAttribute('id', id);
  });

  it('should render its text', () => {
    const { heading } = renderComponent();
    expect(heading).toHaveTextContent(children);
  });
});
