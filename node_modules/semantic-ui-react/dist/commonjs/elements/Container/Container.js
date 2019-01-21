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
 * A container limits content to a maximum width.
 */
function Container(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      text = props.text,
      textAlign = props.textAlign;
  var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(text, 'text'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useTextAlignProp)(textAlign), 'container', className);
  var rest = (0, _lib.getUnhandledProps)(Container, props);
  var ElementType = (0, _lib.getElementType)(Container, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Container.handledProps = ["as", "children", "className", "content", "fluid", "text", "textAlign"];
Container.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Container has no maximum width. */
  fluid: _propTypes.default.bool,

  /** Reduce maximum width to more naturally accommodate text. */
  text: _propTypes.default.bool,

  /** Align container text. */
  textAlign: _propTypes.default.oneOf(_lib.SUI.TEXT_ALIGNMENTS)
} : {};
var _default = Container;
exports.default = _default;