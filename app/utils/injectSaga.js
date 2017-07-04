import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} name Name of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default ('restart-on-remount') the saga will be started on component mount and cancelled with
 * `task.cancel()` on component un-mount for improved performance. Another two options: 'daemon'—starts the saga on
 * component mount and never cancels it or starts again, 'once-till-unmount'—behaves like 'restart-on-remount' but never
 * runs it again.
 */
export default ({ name, saga, mode }) => (WrappedComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    componentWillMount() {
      const { injectSaga } = this.injectors;

      injectSaga(name, saga, this.props, mode);
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors;

      ejectSaga(name, mode);
    }

    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
