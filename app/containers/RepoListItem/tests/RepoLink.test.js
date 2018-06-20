import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import RepoLink from '../RepoLink';

describe('<RepoLink />', () => {
  it('should match the snapshot', () => {
    const renderedComponent = renderer.create(<RepoLink />).toJSON();
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<RepoLink />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<RepoLink id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<RepoLink attribute="test" />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
