/**
 * Use this where required in React 16
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(info) {
    // Display fallback UI
    this.setState({ hasError: true, error: info });
    if (this.props.logStackTrace) {
      console.warn(info); // eslint-disable-line no-console
    }
  }

  renderErrorStackTrace() {
    // Display stack trace only in dev environment
    if (process.env.NODE_ENV === 'development') {
      return (<pre>{this.state.error.stack}</pre>);
    }
    return null;
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1><FormattedMessage {...messages.error} /></h1>
          { this.props.showStackTrace && this.renderErrorStackTrace() }
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  showStackTrace: PropTypes.bool,
  logStackTrace: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  showStackTrace: false,
  logStackTrace: false,
};
