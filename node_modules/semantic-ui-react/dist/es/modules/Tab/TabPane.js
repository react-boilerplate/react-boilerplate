import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import Segment from '../../elements/Segment/Segment';
/**
 * A tab pane holds the content of a tab.
 */

function TabPane(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      loading = props.loading;
  var classes = cx(useKeyOnly(active, 'active'), useKeyOnly(loading, 'loading'), 'tab', className);
  var rest = getUnhandledProps(TabPane, props);
  var ElementType = getElementType(TabPane, props);
  var calculatedDefaultProps = {};

  if (ElementType === Segment) {
    calculatedDefaultProps.attached = 'bottom';
  }

  return React.createElement(ElementType, _extends({}, calculatedDefaultProps, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

TabPane.handledProps = ["active", "as", "children", "className", "content", "loading"];
TabPane.defaultProps = {
  as: Segment,
  active: true
};
TabPane.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A tab pane can be active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A Tab.Pane can display a loading indicator. */
  loading: PropTypes.bool
} : {};
TabPane.create = createShorthandFactory(TabPane, function (content) {
  return {
    content: content
  };
});
export default TabPane;