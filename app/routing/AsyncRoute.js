/**
 * A helper component that renders a Route that will asynchronously load a component only when the Route is
 * rendered. This allows for code-splitting.
 *
 * Inspired by https://reacttraining.com/react-router/web/guides/code-splitting
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { routeLoaded } from 'containers/App/actions';
import { makeSelectLocation } from 'containers/App/selectors';

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
      // handle both es imports and cjs
      const component = mod.default ? mod.default : mod;
      this.setState({
        mod: component,
      });
      this.props.onRouteLoaded(this.props.location.pathname, component);
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
  location: React.PropTypes.object,
  onRouteLoaded: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onRouteLoaded: (path, component) => dispatch(routeLoaded(path, component)),
  };
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
});

const ConnectedBundle = connect(mapStateToProps, mapDispatchToProps)(Bundle);

const AsyncRoute = ({ load, ...others }) => (
  <Route
    {...others} render={(props) => (
      <ConnectedBundle load={load} {...props} />
  )}
  />
);

AsyncRoute.propTypes = {
  computedMatch: React.PropTypes.object,
  path: React.PropTypes.string,
  load: React.PropTypes.func,
};

export default AsyncRoute;
