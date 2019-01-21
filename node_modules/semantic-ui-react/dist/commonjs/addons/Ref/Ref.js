"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _reactDom = require("react-dom");

var _handleRef = _interopRequireDefault(require("../../lib/handleRef"));

/**
 * This component exposes a callback prop that always returns the DOM node of both functional and class component
 * children.
 */
var Ref =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Ref, _Component);

  function Ref() {
    (0, _classCallCheck2.default)(this, Ref);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Ref).apply(this, arguments));
  }

  (0, _createClass2.default)(Ref, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-find-dom-node
      (0, _handleRef.default)(this.props.innerRef, (0, _reactDom.findDOMNode)(this));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _handleRef.default)(this.props.innerRef, null);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return _react.Children.only(children);
    }
  }]);
  return Ref;
}(_react.Component);

exports.default = Ref;
(0, _defineProperty2.default)(Ref, "handledProps", ["children", "innerRef"]);
Ref.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: _propTypes.default.element,

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param {HTMLElement} node - Referred node.
   */
  innerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
} : {};