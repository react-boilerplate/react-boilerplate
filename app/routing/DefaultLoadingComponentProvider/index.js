import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

class DefaultLoadingComponentProvider extends React.Component {
  static childContextTypes = {
    defaultLoadingComponent: PropTypes.any,
  };

  static propTypes = {
    component: PropTypes.any,
    children: PropTypes.node,
  };

  getChildContext = () => ({
    // Can't be changed dynamically by design, hence no `setState`; to avoid stale `defaultLoadingComponent` problem
    defaultLoadingComponent: this.props.component,
  });

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}

if (process.env.NODE_ENV !== 'production') {
  DefaultLoadingComponentProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning(
      this.defaultLoadingComponent === nextProps.component,
      '<DefaultLoadingComponentProvider> does not support dynamic <LoadingComponent>'
    );
  };
}

export default DefaultLoadingComponentProvider;
