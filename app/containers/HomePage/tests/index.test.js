/**
 * Test the HomePage
 */

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import * as reposManagerSlice from 'containers/ReposManager/slice';
import configureStore from '../../../configureStore';
import HomePage from '../index';
import { initialState } from '../slice';

const renderHomePage = store =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <HelmetProvider>
          <HomePage />
        </HelmetProvider>
      </IntlProvider>
    </Provider>,
  );

const setUsernameInStoreAndUnmount = ({ store, username }) => {
  // Render, update the state and unmount
  const { container, unmount } = renderHomePage(store);
  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: username } });
  unmount();
};

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    reposManagerSlice.loadRepos = jest.fn(() => ({ type: '' }));
    reposManagerSlice.loadRepos.type = 'app/slice.loadRepos';
  });

  beforeEach(() => {
    store = configureStore({});
    reposManagerSlice.loadRepos.mockClear();
  });

  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderHomePage(store);
    expect(firstChild).toMatchSnapshot();
  });

  it("shouldn't fetch repos on mount if username is empty", () => {
    renderHomePage(store);
    expect(initialState.username).toBe('');
    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();
  });

  it("shouldn't fetch repos on mount if username is truthy but not empty", () => {
    setUsernameInStoreAndUnmount({ store, username: ' ' });

    // Now render again to trigger useEffect
    renderHomePage(store);

    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();
  });

  it('should fetch repos on mount if username is set', () => {
    setUsernameInStoreAndUnmount({ store, username: 'julienben' });

    // Now render again to trigger useEffect
    renderHomePage(store);

    expect(reposManagerSlice.loadRepos).toHaveBeenCalledTimes(1);
  });

  it("shouldn't fetch repos if the form is submitted when the username is empty", () => {
    const { container } = renderHomePage(store);

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();
  });

  it("should fetch repos if the form is submitted when the username isn't empty", () => {
    const { container } = renderHomePage(store);

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'julienben' } });
    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();

    const form = container.querySelector('form');
    fireEvent.submit(form);
    expect(reposManagerSlice.loadRepos).toHaveBeenCalled();
  });
});
