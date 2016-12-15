import React from 'react';
import expect from 'expect';
import { shallow, render } from 'enzyme';

import RepoLink from '../RepoLink';

describe('<RepoLink />', () => {
  it('should render an <a> tag', () => {
    const renderedComponent = render(<RepoLink />);
    expect(renderedComponent.find('a').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<RepoLink />);
    expect(renderedComponent.prop('className')).toExist();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<RepoLink id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<RepoLink attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toNotExist();
  });
});
