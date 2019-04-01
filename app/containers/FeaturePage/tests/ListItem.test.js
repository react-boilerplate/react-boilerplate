import React from 'react';
import { render } from 'react-testing-library';

import ListItem from '../ListItem';

describe('<ListItem />', () => {
  it('should render an <li> tag', () => {
    const {
      container: { firstChild },
    } = render(<ListItem />);
    expect(firstChild.tagName).toEqual('LI');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<ListItem />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<ListItem id={id} />);
    expect(firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const {
      container: { firstChild },
    } = render(<ListItem attribute="test" />);
    expect(firstChild.hasAttribute('attribute')).toBe(false);
  });
});
