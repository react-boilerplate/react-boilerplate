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
import * as slice from '../slice';

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

  it("shouldn't fetch repos on mount (if username is empty)", () => {
    renderHomePage(store);
    expect(slice.initialState.username).toBe('');
    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();
  });

  it("shouldn't fetch repos if the form is submitted when the username is empty", () => {
    const { container } = renderHomePage(store);

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();
  });

  it("should fetch repos if the form is submitted when the username isn't empty", () => {
    const { container } = renderHomePage(store);

    store.dispatch(slice.changeUsername({ username: 'julienben' }));

    const input = container.querySelector('input');
    fireEvent.change(input, { target: { value: 'julienben' } });
    expect(reposManagerSlice.loadRepos).not.toHaveBeenCalled();

    const form = container.querySelector('form');
    fireEvent.submit(form);
    expect(reposManagerSlice.loadRepos).toHaveBeenCalled();
  });
});
