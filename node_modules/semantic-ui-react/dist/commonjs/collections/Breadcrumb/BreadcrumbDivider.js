"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * A divider sub-component for Breadcrumb component.
 */
function BreadcrumbDivider(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = (0, _classnames.default)('divider', className);
  var rest = (0, _lib.getUnhandledProps)(BreadcrumbDivider, props);
  var ElementType = (0, _lib.getElementType)(BreadcrumbDivider, props);

  if (!(0, _isNil2.default)(icon)) {
    return _Icon.default.create(icon, {
      defaultProps: (0, _objectSpread2.default)({}, rest, {
        className: classes
      }),
      autoGenerateKey: false
    });
  }

  if (!(0, _isNil2.default)(content)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), content);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? '/' : children);
}

BreadcrumbDivider.handledProps = ["as", "children", "className", "content", "icon"];
BreadcrumbDivider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon: _lib.customPropTypes.itemShorthand
} : {};
BreadcrumbDivider.create = (0, _lib.createShorthandFactory)(BreadcrumbDivider, function (icon) {
  return {
    icon: icon
  };
});
var _default = BreadcrumbDivider;
exports.default = _default;