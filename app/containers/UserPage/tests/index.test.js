import { shallow } from 'enzyme';
import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import { UserPage } from '../index';
import H1 from 'components/H1';

describe('<UserPage />', () => {
  const loadRepos = () => {};
  const username = 'johny';

  it('should render its heading', () => {
    const renderedComponent = shallow(
      <UserPage loadRepos={loadRepos} username={username} />
    );

    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage {...messages.header} values={{ username }} />
      </H1>
    )).toBe(true);
  });

  it('should render the repos list', () => {
    const renderedComponent = shallow(
      <UserPage loadRepos={loadRepos} username={username} />
    );
    expect(renderedComponent.find('ReposList').length).toEqual(1);
  });
});
