import React from 'react';
import { render } from 'enzyme';

import ListItem from 'components/ListItem';
import List from '../index';

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = render(
      <List component={ListItem} />
    );
    expect(renderedComponent.find(ListItem)).toBeDefined();
  });

  it('should render the items', () => {
    const items = [
      { id: 1, name: 'Hello' },
      { id: 2, name: 'World' },
    ];
    const item = ({ name }) => <div>{name}</div>; // eslint-disable-line react/prop-types
    const renderedComponent = render(
      <List items={items} component={item} />
    );
    expect(renderedComponent.find(items)).toBeDefined();
  });
});
