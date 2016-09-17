/**
 * Test the HomePage
 */

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { IntlProvider } from 'react-intl';
import { HomePage, mapDispatchToProps } from '../index';
import { changeUsername } from '../actions';
import { loadRepos } from '../../App/actions';
import { push } from 'react-router-redux';
import RepoListItem from 'containers/RepoListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <IntlProvider locale="en">
        <HomePage
          loading={false}
          error={{ message: 'Loading failed!' }}
        />
      </IntlProvider>
    );
    expect(
      renderedComponent
        .text()
        .indexOf('Something went wrong, please try again!')
      ).toBeGreaterThan(-1);
  });

  it('should render fetch the repos on mount if a username exists', () => {
    const submitSpy = expect.createSpy();
    mount(
      <IntlProvider locale="en">
        <HomePage
          username="Not Empty"
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should render the repositories if loading was successful', () => {
    const repos = [{
      owner: {
        login: 'mxstbr',
      },
      html_url: 'https://github.com/mxstbr/react-boilerplate',
      name: 'react-boilerplate',
      open_issues_count: 20,
      full_name: 'mxstbr/react-boilerplate',
    }];
    const renderedComponent = shallow(
      <HomePage
        repos={repos}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={repos} component={RepoListItem} />)).toEqual(true);
  });

  it('should link to /features', () => {
    const openRouteSpy = expect.createSpy();

    // Spy on the openRoute method of the HomePage
    const openRoute = (dest) => {
      if (dest === '/features') {
        openRouteSpy();
      }
    };

    const renderedComponent = mount(
      <IntlProvider locale="en">
        <HomePage loading changeRoute={openRoute} />
      </IntlProvider>
    );
    const button = renderedComponent.find('button');
    button.simulate('click');
    expect(openRouteSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUsername).toExist();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = expect.createSpy();
        const result = mapDispatchToProps(dispatch);
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(changeUsername(username));
      });
    });
  });

  describe('changeRoute', () => {
    it('should be injected', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      expect(result.changeRoute).toExist();
    });

    it('should dispatch push when called', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      const route = '/';
      result.changeRoute(route);
      expect(dispatch).toHaveBeenCalledWith(push(route));
    });
  });

  describe('onSubmitForm', () => {
    it('should be injected', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      expect(result.onSubmitForm).toExist();
    });

    it('should dispatch loadRepos when called', () => {
      const dispatch = expect.createSpy();
      const result = mapDispatchToProps(dispatch);
      result.onSubmitForm();
      expect(dispatch).toHaveBeenCalledWith(loadRepos());
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = expect.createSpy();
      const result = mapDispatchToProps(() => {});
      const evt = { preventDefault };
      result.onSubmitForm(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });
});
