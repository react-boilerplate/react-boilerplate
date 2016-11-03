import { render } from 'enzyme';
import React from 'react';

import List from '../index';
import ListItem from 'components/ListItem';

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = render(
      <List component={ListItem} />
    );
    expect(renderedComponent.find(ListItem)).toBeDefined();
  });

  it('should render the items', () => {
    const items = [
      'Hello',
      'World',
    ];
    const renderedComponent = render(
      <List items={items} component={ListItem} />
    );
    expect(renderedComponent.find(items)).toBeDefined();
  });
});
