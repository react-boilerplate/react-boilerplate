import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} name Name of the reducer
 * @param {function} reducer A reducer that will be injected
 * @param {string} [mode] By default ('restart-on-remount') the reducer will be started on component mount and removed
 * on component un-mount for improved performance. Another option is 'daemon' that starts the reducer on component mount and
 * never removes it.
 */
export default ({ name, reducer, mode }) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;

      injectReducer(name, reducer);
    }

    componentWillUnmount() {
      const { ejectReducer } = this.injectors;

      ejectReducer(name, mode);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
