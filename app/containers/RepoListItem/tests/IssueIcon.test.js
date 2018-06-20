import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import IssueIcon from '../IssueIcon';

describe('<IssueIcon />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<IssueIcon />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<IssueIcon />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<IssueIcon id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should adopt any attribute', () => {
    const renderedComponent = shallow(<IssueIcon attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBeDefined();
  });
});
