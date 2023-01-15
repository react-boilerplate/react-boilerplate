/**
 * Test the repo list item
 */

import React from 'react';
import { getByText, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import RepoListItem from '../index';
import configureStore from '../../../configureStore';

const renderComponent = (item, currentUser) => {
  const store = configureStore({ global: { currentUser } });

  return render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <RepoListItem item={item} />
      </IntlProvider>
    </Provider>,
  );
};

const defaultUser = 'mxstbr';
const forkUser = 'julienben';

describe('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      owner: {
        login: 'react-boilerplate',
      },
      html_url: 'https://github.com/react-boilerplate/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'react-boilerplate/react-boilerplate',
    };
  });

  it('should render a ListItem', () => {
    const { container } = renderComponent(item, defaultUser);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render the current username', () => {
    const { queryByText } = renderComponent(item, defaultUser);
    expect(queryByText(item.owner.login)).toBeNull();
  });

  it('should render usernames that are not the current one', () => {
    const { container } = renderComponent(item, forkUser);
    expect(
      getByText(container, content => content.startsWith(item.owner.login)),
    ).not.toBeNull();
  });

  it('should render the repo name', () => {
    const { container } = renderComponent(item, defaultUser);
    expect(
      getByText(container, content => content.endsWith(item.name)),
    ).not.toBeNull();
  });

  it('should render the issue count', () => {
    const { container } = renderComponent(item, defaultUser);
    expect(
      getByText(container, item.open_issues_count.toString(10)),
    ).not.toBeNull();
  });

  it('should render the IssueIcon', () => {
    const { container } = renderComponent(item, defaultUser);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
