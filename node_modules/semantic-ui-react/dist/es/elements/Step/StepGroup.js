import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _extends from "@babel/runtime/helpers/extends";
import _values from "lodash/values";
import _keys from "lodash/keys";
import _without from "lodash/without";
import _map from "lodash/map";
import _pickBy from "lodash/pickBy";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, numberToWordMap, SUI, useKeyOnly, useKeyOrValueAndKey, useValueAndKey, useWidthProp } from '../../lib';
import Step from './Step';
var numberMap = process.env.NODE_ENV !== "production" ? _pickBy(numberToWordMap, function (val, key) {
  return key <= 8;
}) : {};;
/**
 * A set of steps.
 */

function StepGroup(props) {
  var attached = props.attached,
      children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      items = props.items,
      ordered = props.ordered,
      size = props.size,
      stackable = props.stackable,
      unstackable = props.unstackable,
      vertical = props.vertical,
      widths = props.widths;
  var classes = cx('ui', size, useKeyOnly(fluid, 'fluid'), useKeyOnly(ordered, 'ordered'), useKeyOnly(unstackable, 'unstackable'), useKeyOnly(vertical, 'vertical'), useKeyOrValueAndKey(attached, 'attached'), useValueAndKey(stackable, 'stackable'), useWidthProp(widths), 'steps', className);
  var rest = getUnhandledProps(StepGroup, props);
  var ElementType = getElementType(StepGroup, props);

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
    return Step.create(item);
  }));
}

StepGroup.handledProps = ["as", "attached", "children", "className", "content", "fluid", "items", "ordered", "size", "stackable", "unstackable", "vertical", "widths"];
StepGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Steps can be attached to other elements. */
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A fluid step takes up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand array of props for Step. */
  items: customPropTypes.collectionShorthand,

  /** A step can show a ordered sequence of steps. */
  ordered: PropTypes.bool,

  /** Steps can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium')),

  /** A step can stack vertically only on smaller screens. */
  stackable: PropTypes.oneOf(['tablet']),

  /** A step can prevent itself from stacking on mobile. */
  unstackable: PropTypes.bool,

  /** A step can be displayed stacked vertically. */
  vertical: PropTypes.bool,

  /** Steps can be divided evenly inside their parent. */
  widths: PropTypes.oneOf(_toConsumableArray(_keys(numberMap)).concat(_toConsumableArray(_keys(numberMap).map(Number)), _toConsumableArray(_values(numberMap))))
} : {};
export default StepGroup;