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

var _PlaceholderHeader = _interopRequireDefault(require("./PlaceholderHeader"));

var _PlaceholderImage = _interopRequireDefault(require("./PlaceholderImage"));

var _PlaceholderLine = _interopRequireDefault(require("./PlaceholderLine"));

var _PlaceholderParagraph = _interopRequireDefault(require("./PlaceholderParagraph"));

/**
 * A placeholder is used to reserve splace for content that soon will appear in a layout.
 */
function Placeholder(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      inverted = props.inverted;
  var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(inverted, 'inverted'), 'placeholder', className);
  var rest = (0, _lib.getUnhandledProps)(Placeholder, props);
  var ElementType = (0, _lib.getElementType)(Placeholder, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Placeholder.handledProps = ["as", "children", "className", "content", "fluid", "inverted"];
Placeholder.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: _propTypes.default.bool,

  /** A placeholder can have their colors inverted. */
  inverted: _propTypes.default.bool
} : {};
Placeholder.Header = _PlaceholderHeader.default;
Placeholder.Image = _PlaceholderImage.default;
Placeholder.Line = _PlaceholderLine.default;
Placeholder.Paragraph = _PlaceholderParagraph.default;
var _default = Placeholder;
exports.default = _default;