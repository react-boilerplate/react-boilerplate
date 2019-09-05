import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useStore, ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    constructor(props, context) {
      super(props, context);

      getInjectors(context.store).injectReducer(key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ReducerInjector.WrappedComponent = WrappedComponent;

  ReducerInjector.contextType = ReactReduxContext;

  ReducerInjector.displayName = `withReducer(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore();

  React.useEffect(() => {
    getInjectors(store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
