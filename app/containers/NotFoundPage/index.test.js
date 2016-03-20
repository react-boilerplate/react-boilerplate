/**
 * Testing the NotFoundPage
 */

import { NotFound } from './index';
import H1 from 'H1';
import Button from 'Button';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    expect(renderedComponent.contains(<H1>Page not found.</H1>)).toEqual(true);
  });

  it('should render a button', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    const renderedButton = renderedComponent.find(Button);
    expect(renderedButton.length).toEqual(1);
  });

  it('should link to "/"', () => {
    const changeRouteSpy = expect.createSpy();
    const onChangeRoute = (dest) => {
      if (dest === '/') {
        changeRouteSpy();
      }
    };

    const renderedComponent = mount(
      <NotFound changeRoute={onChangeRoute} />
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(changeRouteSpy).toHaveBeenCalled();
  });
});
