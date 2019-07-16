import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ListItem from '../index';

describe('<ListItem />', () => {
  it('should have a class', () => {
    const { container } = render(<ListItem className="test" />);
    expect(container.querySelector('li').hasAttribute('class')).toBe(true);
  });

  it('should render the content passed to it', () => {
    const content = <div data-testid="test">Hello world!</div>;
    const { getByTestId } = render(<ListItem item={content} />);
    expect(getByTestId('test').tagName).toEqual('DIV');
    expect(getByTestId('test')).toHaveTextContent('Hello world!');
  });
});
