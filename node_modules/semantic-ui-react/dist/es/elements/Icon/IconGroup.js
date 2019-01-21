import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI } from '../../lib';
/**
 * Several icons can be used together as a group.
 */

function IconGroup(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      size = props.size;
  var classes = cx(size, 'icons', className);
  var rest = getUnhandledProps(IconGroup, props);
  var ElementType = getElementType(IconGroup, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

IconGroup.handledProps = ["as", "children", "className", "content", "size"];
IconGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Size of the icon group. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium'))
} : {};
IconGroup.defaultProps = {
  as: 'i'
};
export default IconGroup;