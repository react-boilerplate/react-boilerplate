import React from 'react';
import PropTypes from 'prop-types';

export default class DefaultLoadingComponentProvider extends React.Component {
  static childContextTypes = {
    defaultLoadingComponent: PropTypes.any,
  };

  static propTypes = {
    component: PropTypes.any,
    children: PropTypes.node,
  };

  getChildContext = () => ({
    // Can't be changed dynamically by design, hence no `setState`
    defaultLoadingComponent: this.props.component || null,
  });

  render() {
    const { children } = this.props;

    return React.Children.only(children);
  }
}
