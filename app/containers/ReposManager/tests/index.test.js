/**
 *
 * Tests for ReposManager
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import ReposManager from '../index';
import configureStore from '../../../configureStore';

const renderReposManager = store =>
  render(
    <Provider store={store}>
      <ReposManager />
    </Provider>,
  );

describe('<ReposManager />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({});
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderReposManager(store);
    expect(firstChild).toMatchSnapshot();
  });
});
