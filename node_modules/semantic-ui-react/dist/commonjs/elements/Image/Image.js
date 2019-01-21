"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Dimmer = _interopRequireDefault(require("../../modules/Dimmer"));

var _Label = _interopRequireDefault(require("../Label/Label"));

var _ImageGroup = _interopRequireDefault(require("./ImageGroup"));

var imageProps = ['alt', 'height', 'src', 'srcSet', 'width'];
/**
 * An image is a graphic representation of something.
 * @see Icon
 */

function Image(props) {
  var avatar = props.avatar,
      bordered = props.bordered,
      centered = props.centered,
      children = props.children,
      circular = props.circular,
      className = props.className,
      content = props.content,
      dimmer = props.dimmer,
      disabled = props.disabled,
      floated = props.floated,
      fluid = props.fluid,
      hidden = props.hidden,
      href = props.href,
      inline = props.inline,
      label = props.label,
      rounded = props.rounded,
      size = props.size,
      spaced = props.spaced,
      verticalAlign = props.verticalAlign,
      wrapped = props.wrapped,
      ui = props.ui;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(ui, 'ui'), size, (0, _lib.useKeyOnly)(avatar, 'avatar'), (0, _lib.useKeyOnly)(bordered, 'bordered'), (0, _lib.useKeyOnly)(circular, 'circular'), (0, _lib.useKeyOnly)(centered, 'centered'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(hidden, 'hidden'), (0, _lib.useKeyOnly)(inline, 'inline'), (0, _lib.useKeyOnly)(rounded, 'rounded'), (0, _lib.useKeyOrValueAndKey)(spaced, 'spaced'), (0, _lib.useValueAndKey)(floated, 'floated'), (0, _lib.useVerticalAlignProp)(verticalAlign, 'aligned'), 'image', className);
  var rest = (0, _lib.getUnhandledProps)(Image, props);

  var _partitionHTMLProps = (0, _lib.partitionHTMLProps)(rest, {
    htmlProps: imageProps
  }),
      _partitionHTMLProps2 = (0, _slicedToArray2.default)(_partitionHTMLProps, 2),
      imgTagProps = _partitionHTMLProps2[0],
      rootProps = _partitionHTMLProps2[1];

  var ElementType = (0, _lib.getElementType)(Image, props, function () {
    if (!(0, _isNil2.default)(dimmer) || !(0, _isNil2.default)(label) || !(0, _isNil2.default)(wrapped) || !_lib.childrenUtils.isNil(children)) {
      return 'div';
    }
  });

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  if (!_lib.childrenUtils.isNil(content)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), content);
  }

  if (ElementType === 'img') {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rootProps, imgTagProps, {
      className: classes
    }));
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rootProps, {
    className: classes,
    href: href
  }), _Dimmer.default.create(dimmer, {
    autoGenerateKey: false
  }), _Label.default.create(label, {
    autoGenerateKey: false
  }), _react.default.createElement("img", imgTagProps));
}

Image.handledProps = ["as", "avatar", "bordered", "centered", "children", "circular", "className", "content", "dimmer", "disabled", "floated", "fluid", "hidden", "href", "inline", "label", "rounded", "size", "spaced", "ui", "verticalAlign", "wrapped"];
Image.Group = _ImageGroup.default;
Image.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar: _propTypes.default.bool,

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered: _propTypes.default.bool,

  /** An image can appear centered in a content block. */
  centered: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** An image may appear circular. */
  circular: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** An image can show that it is disabled and cannot be selected. */
  disabled: _propTypes.default.bool,

  /** Shorthand for Dimmer. */
  dimmer: _lib.customPropTypes.itemShorthand,

  /** An image can sit to the left or right of other content. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** An image can take up the width of its container. */
  fluid: _lib.customPropTypes.every([_propTypes.default.bool, _lib.customPropTypes.disallow(['size'])]),

  /** An image can be hidden. */
  hidden: _propTypes.default.bool,

  /** Renders the Image as an <a> tag with this href. */
  href: _propTypes.default.string,

  /** An image may appear inline. */
  inline: _propTypes.default.bool,

  /** Shorthand for Label. */
  label: _lib.customPropTypes.itemShorthand,

  /** An image may appear rounded. */
  rounded: _propTypes.default.bool,

  /** An image may appear at different sizes. */
  size: _propTypes.default.oneOf(_lib.SUI.SIZES),

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['left', 'right'])]),

  /** Whether or not to add the ui className. */
  ui: _propTypes.default.bool,

  /** An image can specify its vertical alignment. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS),

  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped: _propTypes.default.bool
} : {};
Image.defaultProps = {
  as: 'img',
  ui: true
};
Image.create = (0, _lib.createShorthandFactory)(Image, function (value) {
  return {
    src: value
  };
});
var _default = Image;
exports.default = _default;