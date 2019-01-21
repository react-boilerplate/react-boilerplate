import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A placeholder can contain an image.
 */

function PlaceholderImage(props) {
  var className = props.className,
      square = props.square,
      rectangular = props.rectangular;
  var classes = cx(useKeyOnly(square, 'square'), useKeyOnly(rectangular, 'rectangular'), 'image', className);
  var rest = getUnhandledProps(PlaceholderImage, props);
  var ElementType = getElementType(PlaceholderImage, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }));
}

PlaceholderImage.handledProps = ["as", "className", "rectangular", "square"];
PlaceholderImage.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,

  /** An image can modify size correctly with responsive styles. */
  square: customPropTypes.every([customPropTypes.disallow(['rectangular']), PropTypes.bool]),

  /** An image can modify size correctly with responsive styles. */
  rectangular: customPropTypes.every([customPropTypes.disallow(['square']), PropTypes.bool])
} : {};
export default PlaceholderImage;