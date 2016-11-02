import ListItem from '../index';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<ListItem />', () => {
  it('should have a className', () => {
    const renderedComponent = mount(<ListItem className="test" />);
    expect(renderedComponent.find('li').prop('className')).toExist();
  });

  it('should render the content passed to it', () => {
    const content = (<div>Hello world!</div>);
    const renderedComponent = mount(
      <ListItem item={content} />
    );
    expect(renderedComponent.contains(content)).toEqual(true);
  });
});
