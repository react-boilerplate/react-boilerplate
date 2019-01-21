"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * Headers may contain subheaders.
 */
function HeaderSubheader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0, _classnames.default)('sub header', className);
  var rest = (0, _lib.getUnhandledProps)(HeaderSubheader, props);
  var ElementType = (0, _lib.getElementType)(HeaderSubheader, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

HeaderSubheader.handledProps = ["as", "children", "className", "content"];
HeaderSubheader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
HeaderSubheader.create = (0, _lib.createShorthandFactory)(HeaderSubheader, function (content) {
  return {
    content: content
  };
});
var _default = HeaderSubheader;
exports.default = _default;