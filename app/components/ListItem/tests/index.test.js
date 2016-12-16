import React from 'react';
import { mount } from 'enzyme';

import ListItem from '../index';

describe('<ListItem />', () => {
  it('should have a className', () => {
    const renderedComponent = mount(<ListItem className="test" />);
    expect(renderedComponent.find('li').prop('className')).toBeDefined();
  });

  it('should render the content passed to it', () => {
    const content = (<div>Hello world!</div>);
    const renderedComponent = mount(
      <ListItem item={content} />
    );
    expect(renderedComponent.contains(content)).toBe(true);
  });
});
