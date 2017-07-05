import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the reducer is injected on component mount and is never removed.
 * Another option is constants.RESTART_ON_REMOUNT—the reducer is started when component mounts and is removed on
 * component un-mount for improved performance.
 *
 */
export default ({ key, reducer, mode }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(key, reducer);
    }

    componentWillUnmount() {
      const { ejectReducer } = this.injectors;

      ejectReducer(key, mode);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
