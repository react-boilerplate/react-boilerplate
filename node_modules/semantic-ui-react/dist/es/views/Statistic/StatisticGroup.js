import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import _map from "lodash/map";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useWidthProp } from '../../lib';
import Statistic from './Statistic';
/**
 * A group of statistics.
 */

function StatisticGroup(props) {
  var children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      horizontal = props.horizontal,
      inverted = props.inverted,
      items = props.items,
      size = props.size,
      widths = props.widths;
  var classes = cx('ui', color, size, useKeyOnly(horizontal, 'horizontal'), useKeyOnly(inverted, 'inverted'), useWidthProp(widths), 'statistics', className);
  var rest = getUnhandledProps(StatisticGroup, props);
  var ElementType = getElementType(StatisticGroup, props);

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

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), _map(items, function (item) {
    return Statistic.create(item);
  }));
}

StatisticGroup.handledProps = ["as", "children", "className", "color", "content", "horizontal", "inverted", "items", "size", "widths"];
StatisticGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A statistic group can be formatted to be different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A statistic group can present its measurement horizontally. */
  horizontal: PropTypes.bool,

  /** A statistic group can be formatted to fit on a dark background. */
  inverted: PropTypes.bool,

  /** Array of props for Statistic. */
  items: customPropTypes.collectionShorthand,

  /** A statistic group can vary in size. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'big', 'massive', 'medium')),

  /** A statistic group can have its items divided evenly. */
  widths: PropTypes.oneOf(SUI.WIDTHS)
} : {};
export default StatisticGroup;