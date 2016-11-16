jest.mock('react-dom');

import ReactDOM from 'react-dom';
import AppContainer from 'containers/AppContainer';

import renderInBrowser from '../renderInBrowser';

describe('rendering in browser', () => {
  const domEl = '!! dom element !!';
  const messages = {};
  const store = {};

  beforeEach(() => {
    document.getElementById = jest.fn(() => domEl);
  });

  it('should render to DOM', () => {
    renderInBrowser({ store, messages });
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  it('should use the right dom element', () => {
    renderInBrowser({ store, messages });
    const mock = ReactDOM.render.mock;
    const args = mock.calls[0];
    expect(document.getElementById).toHaveBeenCalledWith('app');
    expect(args[1]).toEqual(domEl);
  });

  it('should render the AppContainer', () => {
    renderInBrowser({ store, messages });
    const mock = ReactDOM.render.mock;
    const args = mock.calls[0];
    expect(document.getElementById).toHaveBeenCalledWith('app');
    expect(args[0].type).toBe(AppContainer);
  });
});
