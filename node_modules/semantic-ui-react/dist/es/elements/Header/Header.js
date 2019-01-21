import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useValueAndKey, useTextAlignProp, useKeyOrValueAndKey, useKeyOnly } from '../../lib';
import Icon from '../../elements/Icon';
import Image from '../../elements/Image';
import HeaderSubheader from './HeaderSubheader';
import HeaderContent from './HeaderContent';
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
  var classes = cx('ui', color, size, useKeyOnly(block, 'block'), useKeyOnly(disabled, 'disabled'), useKeyOnly(dividing, 'dividing'), useValueAndKey(floated, 'floated'), useKeyOnly(icon === true, 'icon'), useKeyOnly(image === true, 'image'), useKeyOnly(inverted, 'inverted'), useKeyOnly(sub, 'sub'), useKeyOrValueAndKey(attached, 'attached'), useTextAlignProp(textAlign), 'header', className);
  var rest = getUnhandledProps(Header, props);
  var ElementType = getElementType(Header, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  var iconElement = Icon.create(icon, {
    autoGenerateKey: false
  });
  var imageElement = Image.create(image, {
    autoGenerateKey: false
  });
  var subheaderElement = HeaderSubheader.create(subheader, {
    autoGenerateKey: false
  });

  if (iconElement || imageElement) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), iconElement || imageElement, (content || subheaderElement) && React.createElement(HeaderContent, null, content, subheaderElement));
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), content, subheaderElement);
}

Header.handledProps = ["as", "attached", "block", "children", "className", "color", "content", "disabled", "dividing", "floated", "icon", "image", "inverted", "size", "sub", "subheader", "textAlign"];
Header.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Attach header  to other content, like a segment. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** Format header to appear inside a content block. */
  block: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the header. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Show that the header is inactive. */
  disabled: PropTypes.bool,

  /** Divide header from the content below it. */
  dividing: PropTypes.bool,

  /** Header can sit to the left or right of other content. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** Add an icon by icon name or pass an Icon. */
  icon: customPropTypes.every([customPropTypes.disallow(['image']), PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand])]),

  /** Add an image by img src or pass an Image. */
  image: customPropTypes.every([customPropTypes.disallow(['icon']), PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand])]),

  /** Inverts the color of the header for dark backgrounds. */
  inverted: PropTypes.bool,

  /** Content headings are sized with em and are based on the font-size of their container. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'big', 'massive', 'mini')),

  /** Headers may be formatted to label smaller or de-emphasized content. */
  sub: PropTypes.bool,

  /** Shorthand for Header.Subheader. */
  subheader: customPropTypes.itemShorthand,

  /** Align header content. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS)
} : {};
Header.Content = HeaderContent;
Header.Subheader = HeaderSubheader;
export default Header;