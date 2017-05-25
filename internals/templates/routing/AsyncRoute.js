/**
 * A helper component that renders a Route that will load a component when the Route is
 * rendered. This allows for asynchronous loading of routes, enabling code-splitting.
 *
 * Inspired by https://reacttraining.com/react-router/web/guides/code-splitting
 */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/**
 * A wrapper component that will lazily render a component after it has been loaded.
 */
class Bundle extends Component {

  static contextTypes = {
    store: React.PropTypes.object,
  };

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    });
    props.load(this.context.store, (mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { load, ...otherProps } = this.props;
    return this.state.mod && <this.state.mod {...otherProps} />;
  }
}

Bundle.propTypes = {
  children: React.PropTypes.node,
  load: React.PropTypes.func,
};

const AsyncRoute = ({ path, load }) => (
  <Route
    path={path} render={(props) => (
      <Bundle load={load} {...props} />
  )}
  />
);

AsyncRoute.propTypes = {
  path: React.PropTypes.string,
  load: React.PropTypes.func,
};

export default AsyncRoute;
