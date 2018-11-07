import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import createHistory from 'history/createMemoryHistory';

import Header from '../index';
import configureStore from '../../../configureStore';

describe('<Header />', () => {
  const history = createHistory();
  const store = configureStore({}, history);

  afterEach(cleanup);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <Header />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
