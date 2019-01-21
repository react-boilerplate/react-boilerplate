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

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

var _Image = _interopRequireDefault(require("../../elements/Image"));

var _HeaderSubheader = _interopRequireDefault(require("./HeaderSubheader"));

var _HeaderContent = _interopRequireDefault(require("./HeaderContent"));

/**
 * A header provides a short summary of content
 */
function Header(props) {
  var attached = props.attached,
      block = props.block,
      children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      disabled = props.disabled,
      dividing = props.dividing,
      floated = props.floated,
      icon = props.icon,
      image = props.image,
      inverted = props.inverted,
      size = props.size,
      sub = props.sub,
      subheader = props.subheader,
      textAlign = props.textAlign;
  var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(block, 'block'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(dividing, 'dividing'), (0, _lib.useValueAndKey)(floated, 'floated'), (0, _lib.useKeyOnly)(icon === true, 'icon'), (0, _lib.useKeyOnly)(image === true, 'image'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(sub, 'sub'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), (0, _lib.useTextAlignProp)(textAlign), 'header', className);
  var rest = (0, _lib.getUnhandledProps)(Header, props);
  var ElementType = (0, _lib.getElementType)(Header, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  var iconElement = _Icon.default.create(icon, {
    autoGenerateKey: false
  });

  var imageElement = _Image.default.create(image, {
    autoGenerateKey: false
  });

  var subheaderElement = _HeaderSubheader.default.create(subheader, {
    autoGenerateKey: false
  });

  if (iconElement || imageElement) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), iconElement || imageElement, (content || subheaderElement) && _react.default.createElement(_HeaderContent.default, null, content, subheaderElement));
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), content, subheaderElement);
}

Header.handledProps = ["as", "attached", "block", "children", "className", "color", "content", "disabled", "dividing", "floated", "icon", "image", "inverted", "size", "sub", "subheader", "textAlign"];
Header.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Attach header  to other content, like a segment. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top', 'bottom'])]),

  /** Format header to appear inside a content block. */
  block: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Color of the header. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Show that the header is inactive. */
  disabled: _propTypes.default.bool,

  /** Divide header from the content below it. */
  dividing: _propTypes.default.bool,

  /** Header can sit to the left or right of other content. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** Add an icon by icon name or pass an Icon. */
  icon: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['image']), _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.itemShorthand])]),

  /** Add an image by img src or pass an Image. */
  image: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['icon']), _propTypes.default.oneOfType([_propTypes.default.bool, _lib.customPropTypes.itemShorthand])]),

  /** Inverts the color of the header for dark backgrounds. */
  inverted: _propTypes.default.bool,

  /** Content headings are sized with em and are based on the font-size of their container. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'big', 'massive', 'mini')),

  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub: _propTypes.default.bool,

  /** Shorthand for Header.Subheader. */
  subheader: _lib.customPropTypes.itemShorthand,

  /** Align header content. */
  textAlign: _propTypes.default.oneOf(_lib.SUI.TEXT_ALIGNMENTS)
} : {};
Header.Content = _HeaderContent.default;
Header.Subheader = _HeaderSubheader.default;
var _default = Header;
exports.default = _default;