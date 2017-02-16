import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'components/ListItem';
import List from '../index';

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = shallow(
      <List component={ListItem} />
    );
    expect(renderedComponent.find(ListItem)).toBeDefined();
  });

  it('should render the items', () => {
    const items = [
      { id: 1, name: 'Hello' },
      { id: 2, name: 'World' },
    ];

    const renderedComponent = shallow(
      <List items={items} component={ListItem} />
    );
    expect(renderedComponent.find(ListItem)).toBeDefined();
    expect(renderedComponent.find(ListItem).length).toEqual(2);
  });
});
