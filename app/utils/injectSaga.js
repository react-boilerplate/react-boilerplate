import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useStore, ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default ({ key, saga, mode }) => WrappedComponent => {
  class SagaInjector extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.injectors = getInjectors(context.store);

      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  SagaInjector.WrappedComponent = WrappedComponent;

  SagaInjector.contextType = ReactReduxContext;

  SagaInjector.displayName = `withSaga(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return hoistNonReactStatics(SagaInjector, WrappedComponent);
};

const useInjectSaga = ({ key, saga, mode }) => {
  const store = useStore();

  const isInjected = React.useRef(false);

  if (!isInjected.current) {
    getInjectors(store).injectSaga(key, { saga, mode });
    isInjected.current = true;
  }

  React.useEffect(
    () => () => {
      getInjectors(store).ejectSaga(key);
    },
    [],
  );
};

export { useInjectSaga };
