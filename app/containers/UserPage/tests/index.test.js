import React from 'react';
import { browserHistory } from 'react-router';
import { IntlProvider, FormattedMessage } from 'react-intl';
import { shallow, mount } from 'enzyme';

import H1 from 'components/H1';
import configureStore from 'store';
import messages from '../messages';
import { UserPage, mapStateToProps, mapDispatchToProps } from '../index';

describe('<UserPage />', () => {
  let loadReposSpy;
  const username = 'johny';

  beforeEach(() => {
    loadReposSpy = jest.fn();
  });

  it('should render its heading', () => {
    const renderedComponent = shallow(
      <UserPage loadRepos={loadReposSpy} username={username} />
    );

    expect(renderedComponent.contains(
      <H1>
        <FormattedMessage {...messages.header} values={{ username }} />
      </H1>
    )).toBe(true);
  });

  it('should load repos', () => {
    mount(
      <IntlProvider locale="en">
        <UserPage
          loadRepos={loadReposSpy}
          username={username}
          repos={false}
          error={false}
        />
      </IntlProvider>
    );

    expect(loadReposSpy).toHaveBeenCalled();
  });

  it('should render the repos list', () => {
    const renderedComponent = shallow(
      <UserPage loadRepos={loadReposSpy} username={username} />
    );
    expect(renderedComponent.find('ReposList').length).toEqual(1);
  });

  describe('props', () => {
    const store = configureStore({}, browserHistory);
    const state = store.getState();
    const ownProps = {
      params: {
        username,
      },
    };

    let props;
    let dispatchSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn();

      props = {
        ...mapStateToProps(state, ownProps),
        ...mapDispatchToProps(dispatchSpy),
      };
    });

    it('should get the username from params', () => {
      expect(props.username).toEqual(username);
    });

    ['repos', 'error', 'loading'].forEach((propName) => {
      describe(propName, () => {
        it('should exist', () => {
          expect(props[propName]).toBeDefined();
        });
      });
    });

    describe('loadRepos', () => {
      let loadRepos;

      beforeEach(() => {
        loadRepos = props.loadRepos;
      });

      it('should dispatch action', () => {
        loadRepos(username);
        expect(dispatchSpy).toHaveBeenCalled();
      });
    });
  });
});
