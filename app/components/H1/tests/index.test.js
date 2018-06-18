import React from 'react';
import { shallow } from 'enzyme';

import H1 from '../index';

describe('<H1 />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const renderedComponent = shallow(<H1 id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const renderedComponent = shallow(<H1>{children}</H1>);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
