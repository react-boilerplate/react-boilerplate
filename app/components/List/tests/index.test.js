import React from 'react';
import { render } from '@testing-library/react';

import List from '../index';

describe('<List />', () => {
  it('should render the passed component if no items are passed', () => {
    const component = () => <li>test</li>; // eslint-disable-line react/prop-types
    const { queryByText } = render(<List component={component} />);
    expect(queryByText('test')).toBeInTheDocument();
  });

  it('should pass all items props to rendered component', () => {
    const items = [
      { id: 1, name: 'Hello' },
      { id: 2, name: 'World' },
    ];

    const component = ({ item }) => <li>{item.name}</li>; // eslint-disable-line react/prop-types

    const { container, queryByText } = render(
      <List items={items} component={component} />,
    );
    const elements = container.querySelectorAll('li');
    expect(elements).toHaveLength(2);
    expect(queryByText(items[0].name)).toBeInTheDocument();
    expect(queryByText(items[1].name)).toBeInTheDocument();
  });
});
