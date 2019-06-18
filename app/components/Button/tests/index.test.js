/**
 * Testing our Button component
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Button from '../index';

const handleRoute = () => {};
const href = 'http://mxstbr.com';
const children = <h1>Test</h1>;
const renderComponent = (props = {}) => {
  const utils = render(
    <Button href={href} {...props}>
      {children}
    </Button>,
  );

  const button = utils.queryByText('Test').parentNode;
  return { ...utils, button };
};

describe('<Button />', () => {
  it('should render an <a> tag if no route is specified', () => {
    const { button } = renderComponent({ href });
    expect(button.tagName).toBe('A');
  });

  it('should render a <button> tag to change route if the handleRoute prop is specified', () => {
    const { button } = renderComponent({ handleRoute });
    expect(button.tagName).toBe('BUTTON');
  });

  it('should have children', () => {
    const { button } = renderComponent();
    expect(button.children).toHaveLength(1);
  });

  it('should handle click events', () => {
    const onClickSpy = jest.fn();
    const { button } = renderComponent({ onClick: onClickSpy });
    fireEvent.click(button);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should have a class attribute', () => {
    const { button } = renderComponent();
    expect(button).toHaveAttribute('class');
  });

  it('should not adopt a type attribute when rendering an <a> tag', () => {
    const type = 'text/html';
    const { button } = renderComponent({ href, type });
    expect(button).not.toHaveAttribute('type');
  });

  it('should not adopt a type attribute when rendering a button', () => {
    const type = 'submit';
    const { button } = renderComponent({ handleRoute, type });
    expect(button).not.toHaveAttribute('type');
  });
});
