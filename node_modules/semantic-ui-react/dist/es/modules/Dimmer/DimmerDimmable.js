import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A dimmable sub-component for Dimmer.
 */

function DimmerDimmable(props) {
  var blurring = props.blurring,
      className = props.className,
      children = props.children,
      content = props.content,
      dimmed = props.dimmed;
  var classes = cx(useKeyOnly(blurring, 'blurring'), useKeyOnly(dimmed, 'dimmed'), 'dimmable', className);
  var rest = getUnhandledProps(DimmerDimmable, props);
  var ElementType = getElementType(DimmerDimmable, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

DimmerDimmable.handledProps = ["as", "blurring", "children", "className", "content", "dimmed"];
DimmerDimmable.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A dimmable element can blur its contents. */
  blurring: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Controls whether or not the dim is displayed. */
  dimmed: PropTypes.bool
} : {};
export default DimmerDimmable;