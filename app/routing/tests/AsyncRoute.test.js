/**
 * Test AsyncRoute
 */

import React from 'react';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import { Router } from 'react-router-dom';

import AsyncRoute from '../AsyncRoute';

import TestComponent from './TestComponent';

describe('AsyncRoute', () => {
  let markLoaded = null;
  const loaded = new Promise((resolve) => (markLoaded = resolve));

  const testComponentLoader = (cb) => {
    import('./TestComponent')
      .then(cb)
      .then(() => markLoaded(true));
  };

  const App = () => (
    <Router history={createMemoryHistory()}>
      <AsyncRoute path="" load={testComponentLoader} />
    </Router>
  );

  it('loads and renders route', () => {
    const renderedComponent = mount(
      <App />
    );
    return loaded.then(() => (expect(renderedComponent.find(TestComponent).length).toBe(1)));
  });
});
