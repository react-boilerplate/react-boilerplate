import React from 'react';
import { cleanup, render } from 'react-testing-library';

import AtPrefix from '../AtPrefix';

describe('<AtPrefix />', () => {
  afterEach(cleanup);

  it('should render an <span> tag', () => {
    const {
      container: { firstChild },
    } = render(<AtPrefix />);
    expect(firstChild.tagName).toEqual('SPAN');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<AtPrefix />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<AtPrefix id={id} />);
    expect(firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const {
      container: { firstChild },
    } = render(<AtPrefix attribute="test" />);
    expect(firstChild.hasAttribute('attribute')).toBe(false);
  });
});
