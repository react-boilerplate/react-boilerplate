import React from 'react';
import { mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import IssueIcon from '../IssueIcon';

describe('<IssueIcon />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<IssueIcon />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<IssueIcon />);
    const renderedComponent = enzymeFind(wrapper, IssueIcon);
    expect(renderedComponent.at(0).prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<IssueIcon id={id} />);
    const renderedComponent = enzymeFind(wrapper, IssueIcon);
    expect(renderedComponent.at(0).prop('id')).toEqual(id);
  });

  it('should adopt any attribute', () => {
    const wrapper = mount(<IssueIcon attribute="test" />);
    const renderedComponent = enzymeFind(wrapper, IssueIcon);
    expect(renderedComponent.at(0).prop('attribute')).toBeDefined();
  });
});
