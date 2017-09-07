/**
 * A helper that renders a Route while also passing down any subroutes it contains.
 * Any container that has children should use this to render routes to allow nesting.
 *
 * See https://reacttraining.com/react-router/web/example/route-config for an example.
 */

import React, { Component } from 'react';
import { Route } from 'react-router';


/**
 * A wrapper component that will lazily render a component after it has been loaded.
 */
class Bundle extends Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    });
    props.load((mod) => {
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

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const AsyncRoute = ({ path, load }) => (
  <Route
    path={path}
    render={(props) => (
      <Bundle load={load} {...props} />
  )}
  />
);

AsyncRoute.propTypes = {
  path: React.propTypes.string,
  load: React.propTypes.func,
};

export default AsyncRoute;
