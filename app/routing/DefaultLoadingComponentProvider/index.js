import React from 'react';

export default class DefaultLoadingComponentProvider extends React.Component {
  static childContextTypes = {
    defaultLoadingComponent: React.PropTypes.any,
  };

  static propTypes = {
    component: React.PropTypes.any,
    children: React.PropTypes.node,
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
