/* eslint-disable import/first */
jest.mock('react-dom');
jest.mock('react-router');

import ReactDOM from 'react-dom';
import { match } from 'react-router';

import AppRoot from 'containers/AppRoot';

import renderInBrowser from '../renderInBrowser';

describe('rendering in browser', () => {
  const domEl = '!! dom element !!';
  const messages = {};
  const store = {};

  beforeEach(() => {
    document.getElementById = jest.fn(() => domEl);
    match.mockReset();
  });

  function matchAndRender() {
    renderInBrowser({ store, messages });
    const args = match.mock.calls[0];
    const callback = args[1];
    callback();
  }

  it('should use `match` to resolve async routes', () => {
    renderInBrowser({ store, messages });
    expect(match).toHaveBeenCalled();
  });

  it('should render to DOM', () => {
    matchAndRender();
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('should use the right dom element', () => {
    matchAndRender();
    const mock = ReactDOM.render.mock;
    const args = mock.calls[0];
    expect(document.getElementById).toHaveBeenCalledWith('app');
    expect(args[1]).toEqual(domEl);
  });

  it('should render the AppRoot', () => {
    matchAndRender();
    const mock = ReactDOM.render.mock;
    const args = mock.calls[0];
    expect(document.getElementById).toHaveBeenCalledWith('app');
    expect(args[0].type).toBe(AppRoot);
  });
});
