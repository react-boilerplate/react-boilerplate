import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import RepoLink from '../RepoLink';

const renderComponent = (props = {}) => {
  const text = 'Test';
  const utils = render(<RepoLink {...props}>{text}</RepoLink>);
  const element = utils.queryByText(text);
  return { ...utils, element };
};

describe('<RepoLink />', () => {
  it('should match the snapshot', () => {
    const { element } = renderComponent();
    expect(element).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const { element } = renderComponent();
    expect(element).toHaveAttribute('class');
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { element } = renderComponent({ id });
    expect(element).toHaveAttribute('id', id);
  });

  it('should not adopt an invalid attribute', () => {
    const { element } = renderComponent({ attribute: 'test' });
    expect(element).not.toHaveAttribute('attribute');
  });
});
