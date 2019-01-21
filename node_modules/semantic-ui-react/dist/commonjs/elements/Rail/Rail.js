"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * A rail is used to show accompanying content outside the boundaries of the main view of a site.
 */
function Rail(props) {
  var attached = props.attached,
      children = props.children,
      className = props.className,
      close = props.close,
      content = props.content,
      dividing = props.dividing,
      internal = props.internal,
      position = props.position,
      size = props.size;
  var classes = (0, _classnames.default)('ui', position, size, (0, _lib.useKeyOnly)(attached, 'attached'), (0, _lib.useKeyOnly)(dividing, 'dividing'), (0, _lib.useKeyOnly)(internal, 'internal'), (0, _lib.useKeyOrValueAndKey)(close, 'close'), 'rail', className);
  var rest = (0, _lib.getUnhandledProps)(Rail, props);
  var ElementType = (0, _lib.getElementType)(Rail, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Rail.handledProps = ["as", "attached", "children", "className", "close", "content", "dividing", "internal", "position", "size"];
Rail.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A rail can appear attached to the main viewport. */
  attached: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A rail can appear closer to the main viewport. */
  close: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A rail can create a division between itself and a container. */
  dividing: _propTypes.default.bool,

  /** A rail can attach itself to the inside of a container. */
  internal: _propTypes.default.bool,

  /** A rail can be presented on the left or right side of a container. */
  position: _propTypes.default.oneOf(_lib.SUI.FLOATS).isRequired,

  /** A rail can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium'))
} : {};
var _default = Rail;
exports.default = _default;