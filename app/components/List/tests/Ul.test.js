import React from 'react';
import { render } from '@testing-library/react';

import Ul from '../Ul';

const testId = 'list';
const renderComponent = (props = {}) => {
  const utils = render(<Ul {...props} data-testid={testId} />);
  const list = utils.queryByTestId(testId);
  return { ...utils, list };
};

describe('<Ul />', () => {
  it('should render a <ul> tag', () => {
    const { list } = renderComponent();
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe('UL');
  });

  it('should have a class attribute', () => {
    const { list } = renderComponent();
    expect(list).toHaveAttribute('class');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { list } = renderComponent({ id });
    expect(list).toHaveAttribute('id', id);
  });

  it('should not adopt an invalid attribute', () => {
    const { list } = renderComponent({ attribute: 'test' });
    expect(list).not.toHaveAttribute('attribute');
  });
});
