import React from 'react';
import { shallow } from 'enzyme';

import List from '../List';

describe('<List />', () => {
  it('should render an <ul> tag', () => {
    const renderedComponent = shallow(<List />);
    expect(renderedComponent.type()).toEqual('ul');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<List />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<List id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<List attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
