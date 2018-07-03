import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import A from '../A';

describe('<A />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<A />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const renderedComponent = mount(<A />);
    expect(renderedComponent.find('a').prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = mount(<A id={id} />);
    expect(renderedComponent.find('a').prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = mount(<A attribute="test" />);
    expect(renderedComponent.find('a').prop('attribute')).toBeUndefined();
  });
});
