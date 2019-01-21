import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A divider visually segments content into groups.
 */

function Divider(props) {
  var children = props.children,
      className = props.className,
      clearing = props.clearing,
      content = props.content,
      fitted = props.fitted,
      hidden = props.hidden,
      horizontal = props.horizontal,
      inverted = props.inverted,
      section = props.section,
      vertical = props.vertical;
  var classes = cx('ui', useKeyOnly(clearing, 'clearing'), useKeyOnly(fitted, 'fitted'), useKeyOnly(hidden, 'hidden'), useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), useKeyOnly(section, 'section'), useKeyOnly(vertical, 'vertical'), 'divider', className);
  var rest = getUnhandledProps(Divider, props);
  var ElementType = getElementType(Divider, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

Divider.handledProps = ["as", "children", "className", "clearing", "content", "fitted", "hidden", "horizontal", "inverted", "section", "vertical"];
Divider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Divider can clear the content above it. */
  clearing: PropTypes.bool,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Divider can be fitted without any space above or below it. */
  fitted: PropTypes.bool,

  /** Divider can divide content without creating a dividing line. */
  hidden: PropTypes.bool,

  /** Divider can segment content horizontally. */
  horizontal: PropTypes.bool,

  /** Divider can have its colours inverted. */
  inverted: PropTypes.bool,

  /** Divider can provide greater margins to divide sections of content. */
  section: PropTypes.bool,

  /** Divider can segment content vertically. */
  vertical: PropTypes.bool
} : {};
export default Divider;