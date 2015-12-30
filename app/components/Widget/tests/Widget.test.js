import Widget from '../Widget.react';

import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Widget />', () => {
  it('should contain a div', () => {
    const wrapper = shallow(<Widget name="gizmo" />);
    expect(wrapper.find('div')).to.have.length(1);
  });
  it('should have the proper text', () => {
    const wrapper = shallow(<Widget name="gizmo" />);
    expect(wrapper.text()).to.eql('widget is named gizmo');
  });
});
