import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * An ad displays third-party promotional content.
 */

function Advertisement(props) {
  var centered = props.centered,
      children = props.children,
      className = props.className,
      content = props.content,
      test = props.test,
      unit = props.unit;
  var classes = cx('ui', unit, useKeyOnly(centered, 'centered'), useKeyOnly(test, 'test'), 'ad', className);
  var rest = getUnhandledProps(Advertisement, props);
  var ElementType = getElementType(Advertisement, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    "data-text": test
  }), childrenUtils.isNil(children) ? content : children);
}

Advertisement.handledProps = ["as", "centered", "children", "className", "content", "test", "unit"];
Advertisement.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Center the advertisement. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Text to be displayed on the advertisement. */
  test: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),

  /** Varies the size of the advertisement. */
  unit: PropTypes.oneOf(['medium rectangle', 'large rectangle', 'vertical rectangle', 'small rectangle', 'mobile banner', 'banner', 'vertical banner', 'top banner', 'half banner', 'button', 'square button', 'small button', 'skyscraper', 'wide skyscraper', 'leaderboard', 'large leaderboard', 'mobile leaderboard', 'billboard', 'panorama', 'netboard', 'half page', 'square', 'small square']).isRequired
} : {};
export default Advertisement;