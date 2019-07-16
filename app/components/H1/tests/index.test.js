import React from 'react';
import { render } from 'react-testing-library';

import H1 from '../index';

describe('<H1 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<H1 id={id} />);
    expect(container.querySelector('h1').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<H1>{children}</H1>);
    const { childNodes } = container.querySelector('h1');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
