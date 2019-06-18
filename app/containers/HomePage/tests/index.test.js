/**
 * Test the HomePage
 */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import * as appActions from 'containers/App/actions';
import configureStore from '../../../configureStore';
import HomePage from '../index';
import { initialState } from '../reducer';
import { changeUsername } from '../actions';

const renderHomePage = store =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <HomePage />
      </IntlProvider>
    </Provider>,
  );

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    // loadRepos is mocked so that we can spy on it but also so that it doesn't trigger a network request
    appActions.loadRepos = jest.fn(() => ({ type: '' }));
  });

  beforeEach(() => {
    store = configureStore({}, browserHistory);
    appActions.loadRepos.mockClear();
  });

  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderHomePage(store);
    expect(firstChild).toMatchSnapshot();
  });

  it("shouldn't fetch repos on mount if username is an empty string", () => {
    renderHomePage(store);
    expect(initialState.username).toBe('');
    expect(appActions.loadRepos).not.toHaveBeenCalled();
  });

  it('should fetch repos after a username is entered by the user and the form is submitted', () => {
    const { container } = renderHomePage(store);
    store.dispatch(changeUsername('julienben'));
    expect(appActions.loadRepos).not.toHaveBeenCalled();

    const form = container.querySelector('form');
    fireEvent.submit(form);
    expect(appActions.loadRepos).toHaveBeenCalled();
  });
});
