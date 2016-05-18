import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { FeaturePage } from '../index';
import H1 from 'components/H1';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(
      <FeaturePage />
    );
    expect(renderedComponent.contains(<H1>Features</H1>)).toEqual(true);
  });

  it('should link to "/"', () => {
    const openRouteSpy = expect.createSpy();

    // Spy on the openRoute method of the FeaturePage
    const openRoute = (dest) => {
      if (dest === '/') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(
      <FeaturePage changeRoute={openRoute} />
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });
});
