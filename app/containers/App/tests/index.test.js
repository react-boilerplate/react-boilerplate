import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Provider } from 'react-redux';
import App from '../index';
import configureStore from '../../../configureStore';
import history from '../../../utils/history';

const renderer = new ShallowRenderer();

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
