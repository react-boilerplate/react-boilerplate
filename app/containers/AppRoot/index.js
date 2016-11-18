/*
 *
 * AppRoot
 *
 */

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import LanguageProvider from 'containers/LanguageProvider';

class AppRoot extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    store: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { store, messages, children } = this.props;
    return (
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          {React.Children.only(children)}
        </LanguageProvider>
      </Provider>
    );
  }
}

export default AppRoot;
