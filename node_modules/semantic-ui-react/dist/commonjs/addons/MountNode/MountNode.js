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

var _lib = require("../../lib");

var _getNodeFromProps = _interopRequireDefault(require("./lib/getNodeFromProps"));

var _handleClassNamesChange = _interopRequireDefault(require("./lib/handleClassNamesChange"));

var _NodeRegistry = _interopRequireDefault(require("./lib/NodeRegistry"));

var nodeRegistry = new _NodeRegistry.default();
/**
 * A component that allows to manage classNames on a DOM node in declarative manner.
 */

var MountNode =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MountNode, _Component);

  function MountNode() {
    (0, _classCallCheck2.default)(this, MountNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MountNode).apply(this, arguments));
  }

  (0, _createClass2.default)(MountNode, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_ref) {
      var nextClassName = _ref.className;
      var currentClassName = this.props.className;
      return nextClassName !== currentClassName;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var node = (0, _getNodeFromProps.default)(this.props);

      if (node) {
        nodeRegistry.add(node, this);
        nodeRegistry.emit(node, _handleClassNamesChange.default);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var node = (0, _getNodeFromProps.default)(this.props);
      if (node) nodeRegistry.emit(node, _handleClassNamesChange.default);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var node = (0, _getNodeFromProps.default)(this.props);

      if (node) {
        nodeRegistry.del(node, this);
        nodeRegistry.emit(node, _handleClassNamesChange.default);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return MountNode;
}(_react.Component);

exports.default = MountNode;
(0, _defineProperty2.default)(MountNode, "handledProps", ["className", "node"]);
MountNode.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Additional classes. */
  className: _propTypes.default.string,

  /** The DOM node where we will apply class names. Defaults to document.body. */
  node: _lib.customPropTypes.domNode
} : {};