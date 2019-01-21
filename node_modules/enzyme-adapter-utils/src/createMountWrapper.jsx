import React from 'react';
import PropTypes from 'prop-types';

/* eslint react/forbid-prop-types: 0 */

/**
 * This is a utility component to wrap around the nodes we are
 * passing in to `mount()`. Theoretically, you could do everything
 * we are doing without this, but this makes it easier since
 * `renderIntoDocument()` doesn't really pass back a reference to
 * the DOM node it rendered to, so we can't really "re-render" to
 * pass new props in.
 */
export default function createMountWrapper(node, options = {}) {
  class WrapperComponent extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        mount: true,
        props: this.props.props,
        context: this.props.context,
      };
    }
    setChildProps(newProps, newContext, callback = undefined) {
      const props = { ...this.state.props, ...newProps };
      const context = { ...this.state.context, ...newContext };
      this.setState({ props, context }, callback);
    }
    getInstance() {
      const component = this._reactInternalInstance._renderedComponent;
      const inst = component.getPublicInstance();
      if (inst === null) {
        return component._instance;
      }
      return inst;
    }
    getWrappedComponent() {
      const component = this._reactInternalInstance._renderedComponent;
      const inst = component.getPublicInstance();
      if (inst === null) {
        return component._instance;
      }
      return inst;
    }
    setChildContext(context) {
      return new Promise(resolve => this.setState({ context }, resolve));
    }
    render() {
      const { Component } = this.props;
      const { mount, props } = this.state;
      if (!mount) return null;
      return (
        <Component {...props} />
      );
    }
  }
  WrapperComponent.propTypes = {
    Component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    props: PropTypes.object.isRequired,
    context: PropTypes.object,
  };
  WrapperComponent.defaultProps = {
    context: null,
  };

  if (options.context && (node.type.contextTypes || options.childContextTypes)) {
    // For full rendering, we are using this wrapper component to provide context if it is
    // specified in both the options AND the child component defines `contextTypes` statically
    // OR the merged context types for all children (the node component or deeper children) are
    // specified in options parameter under childContextTypes.
    // In that case, we define both a `getChildContext()` function and a `childContextTypes` prop.
    const childContextTypes = {
      ...node.type.contextTypes,
      ...options.childContextTypes,
    };

    WrapperComponent.prototype.getChildContext = function getChildContext() {
      return this.state.context;
    };
    WrapperComponent.childContextTypes = childContextTypes;
  }
  return WrapperComponent;
}
