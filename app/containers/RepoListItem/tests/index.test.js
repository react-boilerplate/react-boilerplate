/**
 * Test the repo list item
 */

import expect from 'expect';
import { shallow, render } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import { RepoListItem } from '../index';
import ListItem from 'components/ListItem';

const renderComponent = (props = {}) => render(
  <IntlProvider locale="en">
    <RepoListItem {...props} />
  </IntlProvider>
);

describe('<RepoListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'mxstbr/react-boilerplate',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <RepoListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toEqual(1);
  });

  it('should not render the current username', () => {
    const renderedComponent = renderComponent({
      item,
      currentUser: item.owner.login,
    });
    expect(renderedComponent.text()).toExclude(item.owner.login);
  });

  it('should render usernames that are not the current one', () => {
    const renderedComponent = renderComponent({
      item,
      currentUser: 'nikgraf',
    });
    expect(renderedComponent.text()).toInclude(item.owner.login);
  });

  it('should render the repo name', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toInclude(item.name);
  });

  it('should render the issue count', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.text()).toInclude(item.open_issues_count);
  });

  it('should render the IssueIcon', () => {
    const renderedComponent = renderComponent({ item });
    expect(renderedComponent.find('svg').length).toEqual(1);
  });
});
