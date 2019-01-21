import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import PropTypes from 'prop-types';
import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';
import handleRef from '../../lib/handleRef';
/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */

var Ref =
/*#__PURE__*/
function (_Component) {
  _inherits(Ref, _Component);

  function Ref() {
    _classCallCheck(this, Ref);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ref).apply(this, arguments));
  }

  _createClass(Ref, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      handleRef(this.props.innerRef, findDOMNode(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      handleRef(this.props.innerRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return Children.only(children);
    }
  }]);

  return Ref;
}(Component);

_defineProperty(Ref, "handledProps", ["children", "innerRef"]);

export { Ref as default };
Ref.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: PropTypes.element,

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} : {};