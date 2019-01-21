import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A table can have a header.
 */

function TableHeader(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fullWidth = props.fullWidth;
  var classes = cx(useKeyOnly(fullWidth, 'full-width'), className);
  var rest = getUnhandledProps(TableHeader, props);
  var ElementType = getElementType(TableHeader, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

TableHeader.handledProps = ["as", "children", "className", "content", "fullWidth"];
TableHeader.defaultProps = {
  as: 'thead'
};
TableHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A definition table can have a full width header or footer, filling in the gap left by the first column. */
  fullWidth: PropTypes.bool
} : {};
export default TableHeader;