"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _BreadcrumbDivider = _interopRequireDefault(require("./BreadcrumbDivider"));

var _BreadcrumbSection = _interopRequireDefault(require("./BreadcrumbSection"));

/**
 * A breadcrumb is used to show hierarchy between content.
 */
function Breadcrumb(props) {
  var children = props.children,
      className = props.className,
      divider = props.divider,
      icon = props.icon,
      sections = props.sections,
      size = props.size;
  var classes = (0, _classnames.default)('ui', size, 'breadcrumb', className);
  var rest = (0, _lib.getUnhandledProps)(Breadcrumb, props);
  var ElementType = (0, _lib.getElementType)(Breadcrumb, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  var childElements = [];
  (0, _each2.default)(sections, function (section, index) {
    // section
    var breadcrumbElement = _BreadcrumbSection.default.create(section);

    childElements.push(breadcrumbElement); // divider

    if (index !== sections.length - 1) {
      var key = "".concat(breadcrumbElement.key, "_divider") || JSON.stringify(section);
      childElements.push(_BreadcrumbDivider.default.create({
        content: divider,
        icon: icon,
        key: key
      }));
    }
  });
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), childElements);
}

Breadcrumb.handledProps = ["as", "children", "className", "divider", "icon", "sections", "size"];
Breadcrumb.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['icon']), _lib.customPropTypes.contentShorthand]),

  /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
   *  Breadcrumb.Divider. */
  icon: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['divider']), _lib.customPropTypes.itemShorthand]),

  /** Shorthand array of props for Breadcrumb.Section. */
  sections: _lib.customPropTypes.collectionShorthand,

  /** Size of Breadcrumb. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium'))
} : {};
Breadcrumb.Divider = _BreadcrumbDivider.default;
Breadcrumb.Section = _BreadcrumbSection.default;
var _default = Breadcrumb;
exports.default = _default;