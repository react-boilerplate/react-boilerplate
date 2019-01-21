import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A statistic can contain a numeric, icon, image, or text value.
 */

function StatisticValue(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      text = props.text;
  var classes = cx(useKeyOnly(text, 'text'), 'value', className);
  var rest = getUnhandledProps(StatisticValue, props);
  var ElementType = getElementType(StatisticValue, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

StatisticValue.handledProps = ["as", "children", "className", "content", "text"];
StatisticValue.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Format the value with smaller font size to fit nicely beside number values. */
  text: PropTypes.bool
} : {};
StatisticValue.create = createShorthandFactory(StatisticValue, function (content) {
  return {
    content: content
  };
});
export default StatisticValue;