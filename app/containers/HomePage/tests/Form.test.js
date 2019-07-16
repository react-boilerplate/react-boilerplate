import React from 'react';
import { render } from 'react-testing-library';

import Form from '../Form';

describe('<Form />', () => {
  it('should render an <form> tag', () => {
    const {
      container: { firstChild },
    } = render(<Form />);
    expect(firstChild.tagName).toEqual('FORM');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<Form />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<Form id={id} />);
    expect(firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const {
      container: { firstChild },
    } = render(<Form attribute="test" />);
    expect(firstChild.hasAttribute('attribute')).toBe(false);
  });
});
