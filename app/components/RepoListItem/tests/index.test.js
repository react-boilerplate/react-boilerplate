/**
 * Test the repo list item
 */

import React from 'react';
import { getByText, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import RepoListItem from '../index';

const renderComponent = item =>
  render(
    <IntlProvider locale="en">
      <RepoListItem item={item} />
    </IntlProvider>,
  );

describe('<RepoListItem />', () => {
  let ownedItem;
  let notOwnedItem;

  // Before each test reset the item data for safety
  beforeEach(() => {
    // Repo owned by the user whose account we're querying
    ownedItem = {
      isOwnRepo: true,
      owner: {
        login: 'repo-owner',
      },
      html_url: 'https://github.com/repo-owner/repo_name',
      name: 'repo_name',
      open_issues_count: 20,
      full_name: 'repo-owner/repo-name',
    };

    // Repo NOT owned by the user whose account we're querying
    notOwnedItem = {
      isOwnRepo: false,
      owner: {
        login: 'repo-owner',
      },
      html_url: 'https://github.com/repo-owner/repo_name',
      name: 'repo_name',
      open_issues_count: 20,
      full_name: 'repo-owner/repo-name',
    };
  });

  it('should render a ListItem', () => {
    const { container } = renderComponent(notOwnedItem);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render the username if repo is owned by user', () => {
    const { queryByText } = renderComponent(ownedItem);
    expect(queryByText(ownedItem.owner.login)).toBeNull();
  });

  it('should render username if the repo belongs to a differet user or org', () => {
    const { container } = renderComponent(notOwnedItem);
    expect(
      getByText(container, content =>
        content.startsWith(notOwnedItem.owner.login),
      ),
    ).not.toBeNull();
  });

  it('should render the repo name', () => {
    const { container } = renderComponent(ownedItem);
    expect(
      getByText(container, content => content.endsWith(ownedItem.name)),
    ).not.toBeNull();
  });

  it('should render the issue count', () => {
    const { container } = renderComponent(ownedItem);
    expect(
      getByText(container, ownedItem.open_issues_count.toString(10)),
    ).not.toBeNull();
  });

  it('should render the IssueIcon', () => {
    const { container } = renderComponent(ownedItem);
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
