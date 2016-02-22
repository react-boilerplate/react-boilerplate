import { HomePage } from './index';
import List from 'List';
import ListItem from 'ListItem';
import RepoListItem from 'RepoListItem';
import LoadingIndicator from 'LoadingIndicator';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = shallow(
      <HomePage
        loading={false}
        error="Page not found"
      />
    );
    const ErrorComponent = () => (
      <ListItem content={'Something went wrong, please try again!'} />
    );
    expect(renderedComponent.contains(ErrorComponent)).toEqual(true);
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [{
      owner: {
        login: 'mxstbr'
      },
      html_url: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'mxstbr/react-boilerplate'
    }];
    const renderedComponent = shallow(
      <HomePage
        repos={repos}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={repos} component={RepoListItem} />)).toEqual(true);
  });
});
