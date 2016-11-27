import React from 'react';
import { shallow } from 'enzyme';

import StyledButton from '../StyledButton';

describe('<StyledButton />', () => {
  it('should render an <button> tag', () => {
    const renderedComponent = shallow(<StyledButton />);
    expect(renderedComponent.type()).toEqual('button');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<StyledButton />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledButton id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<StyledButton attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
