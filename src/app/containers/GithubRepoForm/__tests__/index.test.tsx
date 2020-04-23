import React from 'react';

import {
  Store,
  ActionCreatorWithoutPayload,
  PayloadAction,
  ActionCreator,
  Action,
} from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { GithubRepoForm } from '..';
import { configureAppStore } from 'store/configureStore';
import { actions, initialState } from '../slice';

const renderGithubRepoForm = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <GithubRepoForm />
        </HelmetProvider>
      </ThemeProvider>
    </Provider>,
  );

const setUsernameInStoreAndUnmount = (store: Store, username: string) => {
  // Render, update the state and unmount
  const { container, unmount } = renderGithubRepoForm(store);
  const input = container.querySelector('input');
  fireEvent.change(input!, { target: { value: username } });
  unmount();
};

describe('<GithubRepoForm />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let mockLoadRepos: jest.Mock<Action<string>>;

  beforeAll(() => {
    mockLoadRepos = jest.fn(() => ({
      type: '',
    }));
    actions.loadRepos = mockLoadRepos as any;
    actions.loadRepos.type = 'different_type_so_that_saga_wont_trigger';
  });

  beforeEach(() => {
    store = configureAppStore();
    mockLoadRepos.mockClear();
  });

  it('should match the snapshot', () => {
    const form = renderGithubRepoForm(store);
    expect(form.container.firstChild).toMatchSnapshot();
  });

  it("should fetch repos on mount if username isn't empty", () => {
    renderGithubRepoForm(store);
    expect(initialState.username.length).toBeGreaterThan(0);
    expect(mockLoadRepos).toHaveBeenCalledTimes(1);
  });

  it("shouldn't fetch repos on mount if username is empty", () => {
    setUsernameInStoreAndUnmount(store, '');
    mockLoadRepos.mockClear();

    // Now render again to trigger useEffect
    renderGithubRepoForm(store);
    expect(mockLoadRepos).not.toHaveBeenCalled();
  });
});
