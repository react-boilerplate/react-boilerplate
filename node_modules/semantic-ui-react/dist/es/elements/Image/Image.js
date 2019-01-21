import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _isNil from "lodash/isNil";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, partitionHTMLProps, SUI, useKeyOnly, useKeyOrValueAndKey, useValueAndKey, useVerticalAlignProp } from '../../lib';
import Dimmer from '../../modules/Dimmer';
import Label from '../Label/Label';
import ImageGroup from './ImageGroup';
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
  var classes = cx(useKeyOnly(ui, 'ui'), size, useKeyOnly(avatar, 'avatar'), useKeyOnly(bordered, 'bordered'), useKeyOnly(circular, 'circular'), useKeyOnly(centered, 'centered'), useKeyOnly(disabled, 'disabled'), useKeyOnly(fluid, 'fluid'), useKeyOnly(hidden, 'hidden'), useKeyOnly(inline, 'inline'), useKeyOnly(rounded, 'rounded'), useKeyOrValueAndKey(spaced, 'spaced'), useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign, 'aligned'), 'image', className);
  var rest = getUnhandledProps(Image, props);

  var _partitionHTMLProps = partitionHTMLProps(rest, {
    htmlProps: imageProps
  }),
      _partitionHTMLProps2 = _slicedToArray(_partitionHTMLProps, 2),
      imgTagProps = _partitionHTMLProps2[0],
      rootProps = _partitionHTMLProps2[1];

  var ElementType = getElementType(Image, props, function () {
    if (!_isNil(dimmer) || !_isNil(label) || !_isNil(wrapped) || !childrenUtils.isNil(children)) {
      return 'div';
    }
  });

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  if (!childrenUtils.isNil(content)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), content);
  }

  if (ElementType === 'img') {
    return React.createElement(ElementType, _extends({}, rootProps, imgTagProps, {
      className: classes
    }));
  }

  return React.createElement(ElementType, _extends({}, rootProps, {
    className: classes,
    href: href
  }), Dimmer.create(dimmer, {
    autoGenerateKey: false
  }), Label.create(label, {
    autoGenerateKey: false
  }), React.createElement("img", imgTagProps));
}

Image.handledProps = ["as", "avatar", "bordered", "centered", "children", "circular", "className", "content", "dimmer", "disabled", "floated", "fluid", "hidden", "href", "inline", "label", "rounded", "size", "spaced", "ui", "verticalAlign", "wrapped"];
Image.Group = ImageGroup;
Image.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar: PropTypes.bool,

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered: PropTypes.bool,

  /** An image can appear centered in a content block. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** An image may appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An image can show that it is disabled and cannot be selected. */
  disabled: PropTypes.bool,

  /** Shorthand for Dimmer. */
  dimmer: customPropTypes.itemShorthand,

  /** An image can sit to the left or right of other content. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** An image can take up the width of its container. */
  fluid: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['size'])]),

  /** An image can be hidden. */
  hidden: PropTypes.bool,

  /** Renders the Image as an <a> tag with this href. */
  href: PropTypes.string,

  /** An image may appear inline. */
  inline: PropTypes.bool,

  /** Shorthand for Label. */
  label: customPropTypes.itemShorthand,

  /** An image may appear rounded. */
  rounded: PropTypes.bool,

  /** An image may appear at different sizes. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]),

  /** Whether or not to add the ui className. */
  ui: PropTypes.bool,

  /** An image can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped: PropTypes.bool
} : {};
Image.defaultProps = {
  as: 'img',
  ui: true
};
Image.create = createShorthandFactory(Image, function (value) {
  return {
    src: value
  };
});
export default Image;