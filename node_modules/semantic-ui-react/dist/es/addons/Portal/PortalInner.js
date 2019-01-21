import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _invoke from "lodash/invoke";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { isBrowser } from '../../lib';
import Ref from '../Ref';
/**
 * An inner component that allows you to render children outside their parent.
 */

var PortalInner =
/*#__PURE__*/
function (_Component) {
  _inherits(PortalInner, _Component);

  function PortalInner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PortalInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PortalInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });

    return _this;
  }

  _createClass(PortalInner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _invoke(this.props, 'onMount', null, _objectSpread({}, this.props, {
        node: this.ref
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _invoke(this.props, 'onUnmount', null, _objectSpread({}, this.props, {
        node: this.ref
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          _this$props$mountNode = _this$props.mountNode,
          mountNode = _this$props$mountNode === void 0 ? isBrowser() ? document.body : null : _this$props$mountNode;
      return createPortal(React.createElement(Ref, {
        innerRef: this.handleRef
      }, children), mountNode);
    }
  }]);

  return PortalInner;
}(Component);

_defineProperty(PortalInner, "handledProps", ["children", "mountNode", "onMount", "onUnmount"]);

PortalInner.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: PropTypes.node.isRequired,

  /** The node where the portal should mount. */
  mountNode: PropTypes.any,

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: PropTypes.func,

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: PropTypes.func
} : {};
export default PortalInner;