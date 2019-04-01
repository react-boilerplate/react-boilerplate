import React from 'react';
import { render } from 'react-testing-library';

import H3 from '../index';

describe('<H3 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<H3 id={id} />);
    expect(container.querySelector('h3').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<H3>{children}</H3>);
    const { childNodes } = container.querySelector('h3');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
