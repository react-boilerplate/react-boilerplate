import React from 'react';
import { shallow } from 'enzyme';

import Select from '../Select';

describe('<Select />', () => {
  it('should render an <select> tag', () => {
    const renderedComponent = shallow(<Select />);
    expect(renderedComponent.type()).toEqual('select');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Select />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<Select id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Select attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
