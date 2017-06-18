import React from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

import { getAsyncInjectors } from 'utils/asyncInjectors';

export default ({ loader, LoadingComponent: CustomLoadingComponent, ...rest }) =>
  class RbLoadable extends React.Component {
    static contextTypes = {
      store: PropTypes.object,
      defaultLoadingComponent: PropTypes.any,
    };

    loaderWithAsyncInjectors = () => {
      if (loader) {
        return loader(getAsyncInjectors(this.context.store))
          .then((component) => component.default ? component.default : component);
      }
      return Promise.resolve(null);
    };

    emptyLoadingComponent = () => null;

    loadableComponent = Loadable({
      ...rest,
      loader: this.loaderWithAsyncInjectors,
      LoadingComponent: CustomLoadingComponent || this.context.defaultLoadingComponent || this.emptyLoadingComponent,
    });

    render() {
      return <this.loadableComponent />;
    }
  };
