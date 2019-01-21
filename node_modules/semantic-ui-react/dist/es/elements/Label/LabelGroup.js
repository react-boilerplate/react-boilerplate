import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly } from '../../lib';
/**
 * A label can be grouped.
 */

function LabelGroup(props) {
  var children = props.children,
      circular = props.circular,
      className = props.className,
      color = props.color,
      content = props.content,
      size = props.size,
      tag = props.tag;
  var classes = cx('ui', color, size, useKeyOnly(circular, 'circular'), useKeyOnly(tag, 'tag'), 'labels', className);
  var rest = getUnhandledProps(LabelGroup, props);
  var ElementType = getElementType(LabelGroup, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

LabelGroup.handledProps = ["as", "children", "circular", "className", "color", "content", "size", "tag"];
LabelGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Labels can share shapes. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Label group can share colors together. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Label group can share sizes together. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** Label group can share tag formatting. */
  tag: PropTypes.bool
} : {};
export default LabelGroup;